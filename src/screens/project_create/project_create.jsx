import React, { useCallback, useContext, useRef, useState } from 'react';
import TagItem from '../../components/tagItem/tagItem';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import styles from './project_create.module.css';
import { ImageUploader } from '../../service/image_uploader';
import { OauthContext } from '../../context/oauthContext';
import { useNavigate } from 'react-router-dom';
import { TokenCheck } from '../../service/token_check';
import instance from '../../service/interceptor';

export default function ProjectCreate() {
  const [tagItem, setTagItem] = useState([]);
  const [img, setImg] = useState(
    'https://res.cloudinary.com/seongho-c/image/upload/v1670669517/myfolio/KakaoTalk_20221210_192456496_qv0n2h.png'
  );
  const [loading, setLoading] = useState(false);
  const { userInfo, onRefresh } = useContext(OauthContext);
  const [imgUrl, setImgUrl] = useState();

  const navigate = useNavigate();

  const tagRef = useRef();
  const titleRef = useRef();
  const uploadRef = useRef();
  const contentRef = useRef();
  const githubRef = useRef();
  const webRef = useRef();
  const summaryRef = useRef();

  const imageUpload = useCallback((e) => {
    e.preventDefault();

    uploadRef.current.click();
  }, []);

  const handleTagAdd = useCallback(
    (e) => {
      if (e.target.value.length !== 0 && e.key === 'Enter') {
        e.preventDefault();

        if (tagItem.length === 5) {
          alert('태그의 최대 개수는 5개에요');
          return;
        }

        const updated = [...tagItem];

        updated.push(tagRef.current.value);

        tagRef.current.value = '';
        setTagItem([...new Set(updated)]);
      }
    },
    [tagItem]
  );

  const handleTagRemove = useCallback(
    (tag) => {
      const updated = tagItem.filter((item) => item !== tag);

      setTagItem(updated);
    },
    [tagItem]
  );

  const onPreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImg(reader.result);
        resolve();
      };
    });
  };

  const onImgChange = async (file) => {
    try {
      setLoading(true);
      onPreview(file);
      const response = await ImageUploader(file);

      const { public_id, format } = response.data;
      const url = `https://res.cloudinary.com/seongho-c/image/upload/w_400,h_200,c_fill,g_auto,q_auto:best/${public_id}.${format}`;

      setImgUrl(url);
      setLoading(false);
    } catch (error) {
      console.log(`이미지 변경 error: ${error}`);
    }
  };

  const onDeleteImg = () => {
    setImg(
      'https://res.cloudinary.com/seongho-c/image/upload/v1670669517/myfolio/KakaoTalk_20221210_192456496_qv0n2h.png'
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      memberId: userInfo.sub,
      tags: tagItem,
      title: titleRef.current.value || '',
      content: contentRef.current.getInstance().getMarkdown() || '',
      githubUrl: githubRef.current.value || '',
      webUrl: webRef.current.value || '',
      thumbnailUrl: imgUrl || '',
      summary: summaryRef.current.value || '',
    };

    onRegisterProject(data);
  };

  const onRegisterProject = (data) => {
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
      instance.post(`/project`, data).then(() => {
        alert('작성이 완료되었습니다.');
        navigate('/');
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.ProjectCreate}>
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
        />
      </section>
      <section className={styles.box}>
        <label htmlFor='summary' className={styles.title}>
          한줄 요약
        </label>
        <input
          ref={summaryRef}
          maxLength={65}
          placeholder='프로젝트를 한줄로 요약하세요'
          type='text'
          name='summary'
          className={styles.input}
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
          maxLength={15}
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
          initialValue='프로젝트 내용을 입력하세요'
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
              const response = await ImageUploader(blob);

              const { public_id, format } = response.data;
              const url = `https://res.cloudinary.com/seongho-c/image/upload/w_400,c_fill,g_auto,q_auto:best/${public_id}.${format}`;

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
              <img className={styles.img} src={img} alt='미리보기' />
            )}
          </div>
        </div>
        <input
          ref={uploadRef}
          type='file'
          name='file'
          className={styles.file}
          onChange={(e) => onImgChange(e.target.files[0])}
        />
      </section>
      <section className={styles.box}>
        <div className={styles.title}>
          <label htmlFor='github'>깃허브 주소</label>
          <span className={styles.choice}>(선택)</span>
        </div>
        <input
          ref={githubRef}
          placeholder='깃허브 주소를 입력하세요'
          type='text'
          name='github'
          className={styles.input}
        />
      </section>
      <section className={styles.box}>
        <div className={styles.title}>
          <label htmlFor='web'> 웹 주소</label>
          <span className={styles.choice}>(선택)</span>
        </div>
        <input
          ref={webRef}
          placeholder='웹 주소를 입력하세요'
          type='text'
          name='web'
          className={styles.input}
        />
      </section>
      <footer className={styles.footer}>
        <button
          onClick={onSubmit}
          className={`${styles.footerBtn} ${styles.btn}`}
        >
          등록하기
        </button>
      </footer>
    </div>
  );
}
