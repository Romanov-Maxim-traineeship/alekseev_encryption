import "./style.css";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import { fromEvent } from "rxjs";
import { map, tap } from "rxjs/operators";
import { pipe } from "ramda";

import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

import { getIn, isNotDefined } from "../../utils/ramda";

import encrypter from "./encrypter";

const { TextArea } = Input;

const FirstExersice = (props) => {
  const inputRef = useRef(null);
  const [decryptedValue, setDecryptedValue] = useState("");
  const [encryptedValue, setEncryptedValue] = useState("");

  useEffect(() => {
    const encryptedInput = document.getElementById("encrypted");
    fromEvent(encryptedInput, "input")
      .pipe(map(getIn("target.value")), tap(setEncryptedValue))
      .subscribe(pipe(encrypter.encryptText, setDecryptedValue));
  }, []);

  useEffect(() => {
    const decryptedInput = document.getElementById("decrypted");
    fromEvent(decryptedInput, "input")
      .pipe(map(getIn("target.value")), tap(setDecryptedValue))
      .subscribe(pipe(encrypter.encryptText, setEncryptedValue));
  }, []);

  return (
    <div className="container">
      <TextArea
        id="encrypted"
        value={encryptedValue}
        ref={inputRef}
        placeholder="Зашифрованный текст"
        autoSize={{ minRows: 4 }}
      />

      <div className="arrows">
        <ArrowUpOutlined />
        <ArrowDownOutlined />
      </div>

      <TextArea
        id="decrypted"
        value={decryptedValue}
        placeholder="Расшифрованный текст"
        autoSize={{ minRows: 4 }}
        disabled={isNotDefined(decryptedValue)}
      />
    </div>
  );
};

export default FirstExersice;
