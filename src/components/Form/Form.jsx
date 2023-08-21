import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiMailSend } from "react-icons/bi";
import styles from "./Form.module.css";
import { useAddCommentMutation } from "../../redux/commentApi";

export const Form = () => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const [addComment, { isLoading }] = useAddCommentMutation();

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    switch (name) {
      case "name": {
        setAuthor(value);
        break;
      }
      case "text": {
        setContent(value);
        break;
      }
      default:
        return;
    }
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!author || !content) {
      toast("Fields can not be empty");
      return;
    }
    try {
      await addComment({ author: author, content: content });
      toast.success("Comment added successfully");
    } catch (err) {
      toast.error("Upsss.. Something went wrong!");
    }

    setAuthor("");
    setContent("");
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={onHandleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelName}>Full name</span>
          <input
            type="text"
            name="name"
            className={styles.input}
            value={author}
            onChange={onHandleChange}
          />
        </label>

        <label className={styles.label}>
          <span className={styles.labelName}>Your comment</span>
          <textarea
            className={styles.input}
            name="text"
            rows="5"
            value={content}
            onChange={onHandleChange}
          ></textarea>
        </label>

        <button className={styles.formBtn} disabled={isLoading}>
          <BiMailSend className={styles.icon} />
          {isLoading ? "Sending" : "Send"}
        </button>
      </form>
    </div>
  );
};
