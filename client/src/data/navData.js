const navData = [
    {
        name: 'Mobile',
        subcategories: [
            {
                name: 'Apple',
                subSubcategories: [
                    { name: 'iPhone 16 Series', subSubSubcategories: ['Apple iPhone 16', 'Apple iPhone 16 Pro', 'Apple iPhone 16 Pro Max', 'Apple iPhone 16 Plus'] },
                    { name: 'iPhone 15 Series', subSubSubcategories: ['Apple iPhone 15', 'Apple iPhone 15 Pro', 'Apple iPhone 15 Pro Max'] },
                    { name: 'iPhone 14 Series', subSubSubcategories: ['Apple iPhone 16', 'Apple iPhone 16 Pro', 'Apple iPhone 16 Pro Max', 'Apple iPhone 16 Plus'] },
                    { name: 'iPhone 13 Series', subSubSubcategories: ['Apple iPhone 13', 'Apple iPhone 13 Pro'] },
                    { name: 'iPhone 12 Series', subSubSubcategories: ['Apple iPhone 12', 'Apple iPhone 12 Pro'] },
                    { name: 'iPhone 11 Series', subSubSubcategories: ['Apple iPhone 11', 'Apple iPhone 11 Pro'] },
                    { name: 'iPhone X Series', subSubSubcategories: ['Apple iPhone X'] }
                ]
            },
            { name: 'Samsung', subSubcategories: [] },
            { name: 'Infinix', subSubcategories: [] },
            { name: 'Realme', subSubcategories: [] },
            {name: 'Xiaomi', subSubcategories: ['Xiaomi Redmi 10C', 'Xiaomi Redmi Note 12', 'Xiaomi Redmi 12C', 'Xiaomi Redmi Note 12 Pro', 'Xiaomi Redmi A2+', 'Xiaomi Poco X5 Pro', 'Xiaomi Redmi Note 12s', 'Xiaomi 13T', 'Xiaomi Redmi Note 12 With Redmi Buds 3 Lite', 'Xiaomi Redmi 12 With Realme Buds Q']},
            { name: 'Itel', subSubcategories: ['itel A17', 'itel Value 100', 'Itel S23', 'Itel A60s', 'Itel P40', 'itel A05s', 'Itel S23 With M28 TWS Wireless Earbuds']},
            { name: 'Motorola', subSubcategories: [] },
            { name: 'OnePlus', subSubcategories: ['OnePlus 10 pro dual sim', 'OnePlus 11'] },
            { name: 'Honor', subSubcategories: ['Honor X5 Plus', 'Honor X9a', 'Honor 90', 'Honor 90 Lite'] },
            { name: 'Digit', subSubcategories: ['Digit play', 'Digit infinity max'] },
            { name: 'Tecno', subSubcategories: ['Honor X5 Plus', 'Honor X9a', 'Honor 90', 'Honor 90 Lite'] },
            { name: 'Sparx', subSubcategories: ['Sparx S9', 'Sparx Neo 7 Pro', 'Sparx Neo X', 'Sparx Neo 7 Plus', 'Sparx Neo 7 Ultra', 'Sparx Neo 8'] },
            { name: 'Oppo', subSubcategories: ['Oppo A Series', 'Oppo A78 4G', 'Oppo A58', 'Oppo A18'] },
            { name: 'Vivo', subSubcategories: ['Vivo Y36', 'Vivo Y02T', 'Vivo Y27', 'Vivo Y02', 'Vivo V29e 5G'] },
            { name: 'Sego', subSubcategories: [] },
            { name: 'E Tachi', subSubcategories: ['E-Tachi Mega Music', 'E-Tachi Mega Metal', 'E-Tachi Mega King', 'E-Tachi E-Prime', 'E-Tachi E888', 'E-Tachi E8 Classic', 'E-Tachi E40i'] },
            { name: 'QMobile', subSubcategories: ['QMobile E400i', 'QMobile G3'] },
            { name: 'XMobile', subSubcategories: [] },
            { name: 'MeMobile', subSubcategories: [] },
            { name: 'GFive', subSubcategories: [] },
            { name: 'Nokia', subSubcategories: [] },
            { name: 'Faywa', subSubcategories: [] },
            { name: 'Villaon', subSubcategories: [] }
        ]
    },
    {
        name: 'Laptop',
        subcategories: [
            { name: 'Lenovo', subSubcategories: ['Lenovo L480', 'Lenovo T480', 'Lenovo IdeaPad 3 17IIL05', 'Lenovo IdeaPad 3-15ITL6', 'Lenovo IdeaPad 3-15IML05', 'Lenovo ThinkPad X1 Carbon', 'Lenovo IdeaPad 3 15IAU7', 'Lenovo Legion S7 16IAH7', 'Lenovo Thinkpad T470', 'Lenovo ThinkPad T480s', 'Lenovo ThinkPad T495s', 'Lenovo ThinkPad E570', 'Lenovo ThinkPad E580', 'Lenovo ThinkPad E560'] },
            { name: 'Dell', subSubcategories: ['Dell Latitude E7270', 'Dell Latitude E5490', 'Dell Latitude E5400', 'Dell Precision 5540', 'Dell Latitude E5470', 'Dell Inspiron 15 5510', 'Dell Latitude 5520', 'Dell XPS 15', 'Dell Precision 5550', 'Dell Latitude 5590', 'Dell Precision 7540', 'Dell Latitude 7400 2-in-1', 'Dell Latitude E7470'] },
            { name: 'Hp', subSubcategories: ['HP Elitebook 840 G5', 'HP 250 G9', 'HP EliteBook 830 G5', 'HP EliteBook x360 1030 G2', 'HP EliteBook x360 1030 G4', 'HP EliteBook x360 1030 G7', 'HP ProBook 430 G6', 'HP Probook 440 G4', 'HP Elitebook 830 G6', 'HP Elitebook 840 G2', 'HP EliteBook 840 G3', 'HP Elitebook 840 G5', 'HP Elitebook 850 G3', 'HP Elitebook 850 G5', 'HP Elitebook 850 G6', 'HP Victus 15', 'HP Zbook 14'] },
            { name: 'Parts & Accessories' }
        ]
    },
    {
        name: 'Smart Watches',
        subcategories: [
            { name: "Apple", subSubcategories: ['Apple Watch Series 8 Aluminum', 'Apple Watch Series 9'] },
            { name: "Samsung", subSubcategories: ['Samsung Galaxy Watch 5', 'Samsung Galaxy Watch 4', 'Samsung Galaxy Watch 4 Classic', 'Samsung Galaxy Watch 5 Pro', 'Samsung Galaxy Watch 6 Classic'] },
            { name: "Mibro", subSubcategories: ['Mibro Lite Smart Watch', 'Mibro X1 Smart Watch', 'Mibro Lite 2 Smart Watch', 'Mibro Watch A2', 'Mibro Watch C3', 'Mibro Watch T2', 'Mibro Smart Watch GS Pro'] },
            { name: "Amazfit", subSubcategories: ['Amazfit GTR3 Pro Smart Watch', 'Amazfit T-Rex Pro Smart Watch', 'Amazfit GTS 2 Smart Watch', 'Amazfit T-Rex Ultra Smart Watch'] },
            { name: "Oppo", subSubcategories: ['oppo watch', 'oppo band style'] },
            { name: "Kieslect", subSubcategories: ['Kieslect KR(BT Calling) Smart Watch', 'Kieslect KS Calling Smart Watch', 'Kieslect Kr Pro Calling Smart Watch', 'Kieslect Ks Pro Calling Smart Watch', 'Kieslect Lora 2 Bluetooth Calling Smart Watch'] },
            { name: "Yolo", subSubcategories: ['Yolo Pro Smart Watch', 'Yolo Watch Fortuner', 'Yolo Watch Pro Max', 'Yolo Thunder Smartwatch', 'Yolo Epic Smart Watch', 'Yolo Fortuner Pro Smart Watch', 'Yolo Ultron Smart Watch'] },
            { name: "Fitbit", subSubcategories: ['Fitbit Versa 4', 'Fitbit Sense', 'Fitbit Inspire 2', 'Fitbit Versa 3', 'Fitbit Versa 2', 'Fitbit Charge 4 Fitness Band'] },
            { name: "Realme", subSubcategories: [] },
            { name: "huawei", subSubcategories: [] },
            { name: "Zeblaze", subSubcategories: [] },
            { name: "Joyroom", subSubcategories: [] },
            { name: "Haylou", subSubcategories: [] },
            { name: "Blulory", subSubcategories: [] },
            { name: "Other Watches", subSubcategories: [] },
            { name: "Haino", subSubcategories: [] },
            { name: "Mi", subSubcategories: [] },
            { name: "Xcess", subSubcategories: [] }
        ]
    },
    {
        name: 'Accessories',
        subcategories: [
            { name: 'Mobile Accessories', subSubcategories: ['Wall Chargers', 'Wireless Chargers', 'Cables', 'Headphones & Headset', 'Smartwatches & Accessories', 'Selfie Sticks', 'Phone Camera Flash Lights', 'Docks & Stands', 'Car Chargers', 'Fashion Mobile Accessories', 'Cables & Converters', 'Car Mounts', 'Phone Cases', 'Screen Protectors', 'Phone Batteries', 'Power Banks', 'Mobile Parts & Tools'] },
            { name: 'Computer & Laptop Assessories' }
        ]
    }
];

export default navData;
