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
  { cron : '27 7 * * *' },
  async ({ event, step }) => {
    // await step.sleep('wait-a-moment', '1s');
    // return { message: `Daily news send to ${event.data.email}!` };

    // to do tasks
    // 1. get news from multiple rss feeds
    const getNews = await step.run('fetch-news', async() => {
      console.log('Fetching news...')
      const news = await fetchAllNews()
      console.log('News fetch:', news.length)

      return news
    })
    
    // 2. organized daily news summary
    const newsSummary = await step.run('format-news', async() => {
      console.log('Formating news...')
      const summary = await formatNewsSummary(getNews)
      console.log('Format news:', summary)

      return summary
    })

    // 3. create email content， group message
    const resend = new Resend('re_bU11aYLi_LtXWhyYdgaBmbynWDtArLtjH');
    const { data, error } = await step.run('create-email', async() => {
      console.log('Creating emails...')
      const result = await resend.broadcasts.create({
        from: 'Daily Briefs<dailynews@yscloud.us>',
        segmentId: '0a78ac32-2782-42f3-a0b7-7e5169f1baaa',
        subject: 'Daily Briefs',
        html: newsSummary.html
      })
      return result
    })
    

    // 4. send emails
    const { error: sendError } = await step.run('send-emails', async() => {
      console.log('Sending emails...')
      const result = await resend.broadcasts.send(data?.id!);
      return result
    })
    if (sendError) {
      console.error('error sending email:', sendError);
      return { message: sendError.message };
    }

    return { message: 'Email sent successfully'}
  }
)