const axios = require('axios');
const cheerio = require('cheerio');
const url = 'http://www.cleanup24.co.kr/sub/storelist/list.asp?s_cate=%EC%84%9C%EC%9A%B8';

// 기본 URL 추출을 위한 모듈
const { URL } = require('url');

axios.get(url)
    .then(response => {
        // HTML 데이터 로드
        const html = response.data;
        const $ = cheerio.load(html);

        // 기본 URL 객체 생성
        const baseUrl = new URL(url);

        // schList 클래스 안의 img 태그의 src 속성 중 'upload'가 포함된 값 가져오기
        const stores = [];
        $('.schList').each((index, element) => {
            const store = {};

            // 가게명 (strong 태그, 예: '서울 성산점')
            store.name = $(element).find('dt strong').text().trim();
            console.log(store.name)

            // img 태그의 src 속성 값 중 'upload'가 포함된 값
            $(element).find('img').each((i, imgElement) => {
                let src = $(imgElement).attr('src');
                if (src && src.includes('upload')) {
                    const imgUrl = new URL(src, baseUrl);
                    store.imgUrl = imgUrl.href;
                    // console.log(store.imgUrl)
                }
            });

            // if (store.imgUrl) {
            //     stores.push(store);
            // }
        });

        // 결과 출력

    })
    .catch(error => {
        console.error('Error:', error);
    });
