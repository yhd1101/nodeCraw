const axios = require('axios');
const cheerio = require('cheerio');

async function crawl() {
    try {
        // 웹 페이지에서 데이터를 가져옴
        // const response = await axios.get('https://search.naver.com/search.naver?where=news&sm=tab_jum&query=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90');
        const response = await axios.get('http://www.cleanup24.co.kr/sub/storelist/list.asp?s_cate=%EC%84%9C%EC%9A%B8');

        // Cheerio를 사용하여 HTML을 파싱
        const $ = cheerio.load(response.data);
        // console.log("sdad",$)

        // 원하는 데이터 추출
        const newsTitles = $('total').map((index, element) => $(element).text()).get();
        const newsDescriptions = $('.news_dsc').map((index, element) => $(element).text()).get();
        console.log(newsTitles)

        // // 결과 출력
        // for (let i = 0; i < newsTitles.length; i++) {
        //     console.log(`제목: ${newsTitles[i]}`);
        //     console.log(`설명: ${newsDescriptions[i]}`);
        //     console.log('---');
        // }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// 크롤링 함수 호출
crawl();