import { TopicConfigsZenn } from "../services/zenn/topicConfig.ts";
import { getZennArticles } from "../services/zenn/getArticles.ts";
import { notifyZenn } from "../services/zenn/notify.ts";

import { TopicConfigsQiita } from "../services/qiita/topicConfig.ts";
import { getQiitaArticles } from "../services/qiita/getArticles.ts";
import { notifyQiita } from "../services/qiita/notify.ts";
import { ServiceHandler } from "./types.ts";

export const services: ServiceHandler[] = [
  {
    name: "Zenn",
    topicConfigs: TopicConfigsZenn,
    getArticles: getZennArticles,
    notify: notifyZenn,
  },
  {
    name: "Qiita",
    topicConfigs: TopicConfigsQiita,
    getArticles: getQiitaArticles,
    notify: notifyQiita,
  },
  // 今後 note, dev.to などもここに追加するだけ！
];