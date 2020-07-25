import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "mobx-react-lite/batchingForReactDom";

// antd
import { ConfigProvider, message, Modal } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

import App from "./App";
import "./antd-theme.less";
import * as serviceWorker from "./serviceWorker";


message.config({
  maxCount: 3,
  top: 50
});
moment.locale("zh-cn");

// 路由拦截
const confirmFn = (msg: string, cb: (ok: boolean) => any) => {
  Modal.confirm({
    title: msg,
    okText: "确定",
    onOk: () => cb(true),
    onCancel: () => cb(false)
  });
};

ReactDOM.render(
  <HashRouter getUserConfirmation={confirmFn}>
    <ConfigProvider locale={zh_CN}>
      <App />
    </ConfigProvider>
  </HashRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();

console.log("init", process.env);
