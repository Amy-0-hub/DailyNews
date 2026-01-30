import { fetchAllNews, formatNewsSummary } from "@/lib/rss_utils";
import { inngest } from "./client";
import { Resend } from 'resend';

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const sendDailyNews = inngest.createFunction(
  { id: 'send-daily-news' },
  // { event: 'test/send.daily.news' },
  { cron : '0 9 * * *' },
  async ({ event, step }) => {
    // await step.sleep('wait-a-moment', '1s');
    // return { message: `Daily news send to ${event.data.email}!` };

    // to do tasks
    // 1. get news from multiple rss feeds
    

    // 2. organized daily news summary
    

    // 3. create email content， group message
    

    // 4. send emails
  }
)