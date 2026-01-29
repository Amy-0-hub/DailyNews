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
    const newsItems = await step.run('fetch-news', async () => {
      console.log('Fetching news...');
      const news = await fetchAllNews();
      console.log('New fetched:', news.length);
      return news;
    });

    // 2. organized daily news summary
    const newsSummary = await step.run('format-news', async () => {
      console.log('Formatting news...');
      const summary = formatNewsSummary(newsItems);
      console.log('News formated:', summary);
      return summary;
    })

    // 3. create email content， group message
    const resend = new Resend(process.env.RESENED_API_KEY);
    const { data, error } = await step.run('create-email', async () => {
      console.log('Creating email...');
      const result = await resend.broadcasts.create({
        from: "Daily Briefs <onboarding@resend.dev>",
        segmentId: "0a78ac32-2782-42f3-a0b7-7e5169f1baaa",
        subject: "Daily Briefs" + "${new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}",
        html: newsSummary.html,
      });
      return result
    });

    // 4. send emails
    const { error: sendError } = await step.run('send-email', async () => {
      console.log('Sending email...');
      const result = await resend.broadcasts.send(data?.id!);
      return result
    });
    if (sendError) {
      console.error('Error sending email:', sendError);
      return { message: sendError.message };
    }


  }
)