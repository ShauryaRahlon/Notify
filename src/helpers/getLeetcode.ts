import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeLeetCodeContests() {
    try {
        const response = await axios.get('https://leetcode.com/contest/');
        const $ = cheerio.load(response.data);
        
        const contests:any = [];
        
        // Process each contest card
        $('.swiper-slide').each((i, el) => {
            const card = $(el);
            
            // Extract contest details
            const title = card.find('.font-medium.text-\\[17px\\]').text().trim();
            const relativeLink = card.find('a').attr('href');
            const link = `https://leetcode.com${relativeLink}`;
            const time = card.find('.min-h-\\[80px\\] .text-\\[14px\\]').text().trim();
            const countdown = card.find('.absolute.bottom-0 .flex.items-center').text().trim();
            
            if (title) {
                contests.push({
                    title,
                    link,
                    time,
                    countdown
                });
            }
        });
        console.log('Scraped contests:', contests);
        return contests;
    } catch (error) {
        console.error('Error scraping contests:', error);
        console.log('Returning empty array due to error');
        return [];
    }
}

