import { useState, ChangeEvent, FormEvent } from 'react';
import { FiLoader } from 'react-icons/fi';

import {
  YOUTUBE_LINK,
  FORMAT_RESOLUTIONS_AVALAIBLES as formatAvalaibles,
} from '@v4ly/config/constants';

import s from './Yutu.module.css';

type ResponseYutu = { filename: string; link: string };

export default function Yutu() {
  const [form, setForm] = useState({ filename: '', url: '', resolution: 720 });
  const [loading, setLoading] = useState(false);

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.url.startsWith(YOUTUBE_LINK)) {
      alert("This link isn't the correct format");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3200/api/yt/full', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const res = await response.json();
      const { filename, link } = res as ResponseYutu;
      const anchor = document.createElement('a');

      anchor.href = link;
      anchor.download = filename;
      anchor.click();
      setLoading(false);
    } catch {
      alert('error to try download');
    }
  };

  return (
    <>
      <h2>Download Video</h2>
      <div className={s.info}>
        <p>
          now just we have avalaible download mp4 files, but in the future we'll have for download
          only video or only audio (mp3)
        </p>
      </div>
      <div className={s.wrapper}>
        <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.formControl}>
            <label htmlFor="filename">Filename</label>
            <input
              id="filename"
              className={s.input}
              name="filename"
              placeholder="rename video"
              value={form.filename}
              onChange={handleChange}
            />
          </div>
          <div className={s.formControl}>
            <label htmlFor="url">Url Video*</label>
            <input
              id="url"
              className={s.input}
              name="url"
              placeholder="https://youtube.com/watch?v=ID"
              value={form.url}
              onChange={handleChange}
            />
          </div>
          <select
            className={s.select}
            name="resolution"
            value={form.resolution}
            onChange={handleChange}
          >
            {formatAvalaibles.map(({ value, text }) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
          {form.resolution > 720 && (
            <div className={s.danger}>
              <h4>Recommendation</h4>
              <p>This resolution will be so slow to download the video</p>
            </div>
          )}
          <button className={s.button}>{loading ? <FiLoader /> : 'Download Video'}</button>
        </form>
      </div>
    </>
  );
}
