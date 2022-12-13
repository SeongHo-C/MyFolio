import React, { useContext, useEffect, useRef, useState } from 'react';
import TagItem from '../../components/tagItem/tagItem';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import styles from './project_edit.module.css';
import { ImageUploader } from '../../service/image_uploader';
import { OauthContext } from '../../context/oauthContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TokenCheck } from '../../service/token_check';
import instance from '../../service/interceptor';

export default function ProjectEdit() {
  const [project, setProject] = useState();
  const [tagItem, setTagItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo, onRefresh } = useContext(OauthContext);

  const tagRef = useRef();
  const titleRef = useRef();
  const uploadRef = useRef();
  const contentRef = useRef();
  const githubRef = useRef();
  const webRef = useRef();
  const summaryRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();

  const id = useParams().id;

  const handleChange = (e) => {
    const updated = { ...project };
    updated[e.target.name] = e.target.value;

    setProject(updated);
  };

  const handleTagAdd = (e) => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      e.preventDefault();

      if (tagItem.length >= 5) {
        alert('태그의 최대 개수는 5개에요');
        tagRef.current.value = '';

        return;
      }

      const updated = [...tagItem, tagRef.current.value];

      tagRef.current.value = '';
      setTagItem([...new Set(updated)]);
    }
  };

  const handleTagRemove = (tag) => {
    const updated = tagItem.filter((item) => item !== tag);

    setTagItem(updated);
  };

  const imageUpload = (e) => {
    e.preventDefault();

    uploadRef.current.click();
  };

  const onImgChange = async (file) => {
    setLoading(true);
    const data = await ImageUploader(file).then((response) => response.data);

    const { public_id, format } = data;

    const url = `https://res.cloudinary.com/seongho-c/image/upload/w_400,h_200,c_fill,g_auto,q_auto:best/${public_id}.${format}`;

    const updated = { ...project };
    updated['thumbnailUrl'] = url;

    setProject(updated);
    setLoading(false);
  };

  const onDeleteImg = () => {
    const updated = { ...project };
    updated['thumbnailUrl'] = '';

    setProject(updated);
  };
  console.log(project);

  const onSubmit = (e) => {
    e.preventDefault();

    const { title, githubUrl, webUrl, thumbnailUrl, summary } = project;

    const data = {
      memberId: userInfo.sub,
      tags: tagItem,
      title: title,
      content: contentRef.current.getInstance().getMarkdown(),
      githubUrl: githubUrl || '',
      webUrl: webUrl || '',
      thumbnailUrl: thumbnailUrl,
      summary: summary,
    };

    onRegisterProject(data);
  };

  const onRegisterProject = async (data) => {
    const { title, content, thumbnailUrl, tags, summary } = data;

    if (!title) {
      alert('제목을 입력하세요');
      titleRef.current.focus();
      return;
    }

    if (!summary) {
      alert('프로젝트를 한줄로 요약하세요');
      summaryRef.current.focus();
      return;
    }

    if (tags.length < 1) {
      alert('태그를 입력하고 엔터를 누르세요');
      tagRef.current.focus();

      return;
    }

    if (!content) {
      alert('프로젝트 내용을 입력하세요');
      return;
    }

    if (!thumbnailUrl) {
      alert('썸네일을 업로드하세요');
      return;
    }

    if (TokenCheck()) onRefresh();

    try {
      await instance.put(`/project/${id}`, data).then(() => {
        alert('수정이 완료되었습니다.');
        navigate(`/project/${id}`, { replace: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const tags = location.state.project.tags.map((tag) => tag.name);

    setProject(location.state.project);
    setTagItem(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!project) return;

  return (
    <form className={styles.ProjectEdit} onSubmit={onSubmit}>
      <section className={styles.box}>
        <label htmlFor='title' className={styles.title}>
          제목
        </label>
        <input
          ref={titleRef}
          placeholder='제목을 입력하세요'
          type='text'
          name='title'
          className={styles.input}
          value={project.title}
          onChange={handleChange}
        />
      </section>
      <section className={styles.box}>
        <label htmlFor='summary' className={styles.title}>
          한줄 요약
        </label>
        <input
          ref={summaryRef}
          className={styles.input}
          value={project.summary}
          maxLength={50}
          placeholder='프로젝트를 한줄로 요약하세요'
          type='text'
          name='summary'
          onChange={handleChange}
        />
      </section>
      <section className={styles.box}>
        <div>
          <label htmlFor='tag' className={styles.title}>
            태그
          </label>
          <span className={styles.choice}>(최대 5개)</span>
        </div>
        <input
          placeholder='태그를 입력하고 엔터를 누르세요'
          ref={tagRef}
          type='text'
          name='tag'
          className={styles.input}
          onKeyDown={handleTagAdd}
        />
        <ul className={styles.tagItem}>
          {tagItem.map((tag, idx) => (
            <TagItem key={idx} tag={tag} onTagRemove={handleTagRemove} />
          ))}
        </ul>
      </section>
      <div className={styles.contentBox}>
        <span className={styles.title}>프로젝트 내용</span>
        <Editor
          ref={contentRef}
          className={styles.editor}
          initialValue={project.content}
          previewStyle='vertical'
          hideModeSwitch='WYSIWYG'
          height='400px'
          initialEditType='markdown'
          useCommandShortcut={true}
          plugins={[colorSyntax]}
          toolbarItems={[
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task'],
            ['image'],
            ['codeblock'],
          ]}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              const url = await ImageUploader(blob)
                .then((response) => response.data)
                .then((data) => {
                  const { public_id, format } = data;
                  const url = `https://res.cloudinary.com/seongho-c/image/upload/w_400,c_fill,g_auto,q_auto:best/${public_id}.${format}`;

                  return url;
                });

              callback(url, 'Image');
            },
          }}
        />
      </div>
      <section className={styles.box}>
        <label htmlFor='title' className={styles.title}>
          프로젝트 미리보기
        </label>
        <div className={styles.preview}>
          <div className={styles.previewLeft}>
            <button
              className={`${styles.uploadBtn} ${styles.btn}`}
              onClick={imageUpload}
            >
              썸네일 업로드
            </button>
            <span>2 : 1 비율의 사진 추천</span>
          </div>
          <div className={styles.previewImg} onClick={onDeleteImg}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <img
                className={styles.img}
                src={
                  project.thumbnailUrl
                    ? project.thumbnailUrl
                    : 'https://res.cloudinary.com/seongho-c/image/upload/v1670669517/myfolio/KakaoTalk_20221210_192456496_qv0n2h.png'
                }
                alt='미리보기'
              ></img>
            )}
          </div>
        </div>
        <input
          ref={uploadRef}
          type='file'
          name='thumbnailUrl'
          className={styles.file}
          onChange={(e) => onImgChange(e.target.files[0])}
        />
      </section>
      <section className={styles.box}>
        <div className={styles.title}>
          <label htmlFor='githubUrl'>깃허브 주소</label>
          <span className={styles.choice}>(선택)</span>
        </div>
        <input
          placeholder='깃허브 주소를 입력하세요'
          type='text'
          name='githubUrl'
          value={project.githubUrl || ''}
          className={styles.input}
          onChange={handleChange}
        />
      </section>
      <section className={styles.box}>
        <div className={styles.title}>
          <label htmlFor='webUrl'> 웹 주소</label>
          <span className={styles.choice}>(선택)</span>
        </div>
        <input
          placeholder='웹 주소를 입력하세요'
          type='text'
          name='webUrl'
          value={project.webUrl || ''}
          className={styles.input}
          onChange={handleChange}
        />
      </section>
      <footer className={styles.footer}>
        <button className={`${styles.footerBtn} ${styles.btn}`}>
          수정하기
        </button>
      </footer>
    </form>
  );
}
