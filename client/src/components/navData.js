const navData = [
  {
    title: 'Mobile',
    subItems: [
      {
        title: 'Apple',
        subItems: [
          {title: 'iPhone 16 Series', subItems: [ 'Apple iPhone 16','Apple iPhone 16 Pro','Apple iPhone 16 Pro Max','Apple iPhone 16 Plus']},
          {title: 'iPhone 15 Series', subItems: [ 'Apple iPhone 15','Apple iPhone 15 Pro','Apple iPhone 15 Pro Max']},
          {title: 'iPhone 14 Series', subItems: [ 'Apple iPhone 16','Apple iPhone 16 Pro','Apple iPhone 16 Pro Max','Apple iPhone 16 Plus']},
          {title: 'iPhone 13 Series',subItems: [ 'Apple iPhone 13','Apple iPhone 13 Pro']},
          {title: 'iPhone 12 Series', subItems: [ 'Apple iPhone 12','Apple iPhone 12 Pro']},
          {title: 'iPhone 11 Series',subItems: [ 'Apple iPhone 11','Apple iPhone 11 Pro']},
          {title: 'iPhone X Series',subItems: [ 'Apple iPhone X']}
        ]
      },
      { title: 'Samsung', subItems: [] },
      { title: 'Infinix', subItems: [] },
      { title: 'Realme', subItems: [] },
      { title: 'Xiaomi', subItems: [ 
        'Xiaomi Redmi 10C', 'Xiaomi Redmi Note 12', 'Xiaomi Redmi 12C', 'Xiaomi Redmi Note 12 Pro', 'Xiaomi Redmi A2+', 'Xiaomi Poco X5 Pro', 'Xiaomi Redmi Note 12s', 'Xiaomi 13T', 'Xiaomi Redmi Note 12 With Redmi Buds 3 Lite', 'Xiaomi Redmi 12 With Realme Buds Q' 
      ] },
      { title: 'Itel', subItems: [
        'itel A17', 'itel Value 100', 'Itel S23', 'Itel A60s', 'Itel P40', 'itel A05s', 'Itel S23 With M28 TWS Wireless Earbuds'

      ] },
      { title: 'Motorola', subItems: [] },
      { title: 'OnePlus', subItems: ['OnePlus 10 pro dual sim','OnePlus 11'] },
      { title: 'Honor', subItems: ['Honor X5 Plus', 'Honor X9a', 'Honor 90', 'Honor 90 Lite'] },
      { title: 'Digit', subItems: ['Digit play','Digit infinity max'] },
      { title: 'Tecno', subItems: ['Honor X5 Plus', 'Honor X9a', 'Honor 90', 'Honor 90 Lite'] },
      { title: 'Sparx', subItems: ['Sparx S9', 'Sparx Neo 7 Pro', 'Sparx Neo X', 'Sparx Neo 7 Plus', 'Sparx Neo 7 Ultra', 'Sparx Neo 8'] },
      { title: 'Oppo', subItems: ['Oppo A Series', 'Oppo A78 4G', 'Oppo A58', 'Oppo A18' ] },
      { title: 'Vivo', subItems: ['Vivo Y36', 'Vivo Y02T', 'Vivo Y27', 'Vivo Y02', 'Vivo V29e 5G' ] },
      { title: 'Sego', subItems: [] },
      { title: 'E Tachi', subItems: ['E-Tachi Mega Music', 'E-Tachi Mega Metal', 'E-Tachi Mega King', 'E-Tachi E-Prime', 'E-Tachi E888', 'E-Tachi E8 Classic', 'E-Tachi E40i'] },
      { title: 'QMobile', subItems: ['QMobile E400i','QMobile G3'] },
      { title: 'XMobile', subItems: [] },
      { title: 'MeMobile', subItems: [] },
      { title: 'GFive', subItems: [] },
      { title: 'Nokia', subItems: [] },
      { title: 'Faywa', subItems: [] },
      { title: 'Villaon', subItems: [] }
    ]
  },
  {
    title: 'Laptop',
    subItems: [
      { title: 'Lenovo', subItems: ['Lenovo L480', 'Lenovo T480', 'Lenovo IdeaPad 3 17IIL05', 'Lenovo IdeaPad 3-15ITL6', 'Lenovo IdeaPad 3-15IML05', 'Lenovo ThinkPad X1 Carbon', 'Lenovo IdeaPad 3 15IAU7', 'Lenovo Legion S7 16IAH7', 'Lenovo Thinkpad T470', 'Lenovo ThinkPad T480s', 'Lenovo ThinkPad T495s', 'Lenovo ThinkPad E570','Lenovo ThinkPad E580','Lenovo ThinkPad E560'] },
      { title: 'Dell', subItems: ['Dell Latitude E7270', 'Dell Latitude E5490', 'Dell Latitude E5400', 'Dell Precision 5540', 'Dell Latitude E5470', 'Dell Inspiron 15 5510', 'Dell Latitude 5520', 'Dell XPS 15', 'Dell Precision 5550', 'Dell Latitude 5590', 'Dell Precision 7540', 'Dell Latitude 7400 2-in-1','Dell Latitude E7470'] },
      { title: 'Hp', subItems: ['HP Elitebook 840 G5', 'HP 250 G9', 'HP EliteBook 830 G5', 'HP EliteBook x360 1030 G2', 'HP EliteBook x360 1030 G4', 'HP EliteBook x360 1030 G7', 'HP ProBook 430 G6', 'HP Probook 440 G4', 'HP Elitebook 830 G6', 'HP Elitebook 840 G2', 'HP EliteBook 840 G3', 'HP Elitebook 840 G5', 'HP Elitebook 850 G3', 'HP Elitebook 850 G5', 'HP Elitebook 850 G6', 'HP Victus 15', 'HP Zbook 14'] },
      {title:'Parts & Accessories'}
    ]
  },
  {
    title: 'Smart Watches',
    subItems: [
      { title: "Apple", subItems: ['Apple Watch Series 8 Aluminum', 'Apple Watch Series 9'] },
      { title: "Samsung", subItems: ['Samsung Galaxy Watch 5', 'Samsung Galaxy Watch 4', 'Samsung Galaxy Watch 4 Classic', 'Samsung Galaxy Watch 5 Pro', 'Samsung Galaxy Watch 6 Classic'] },
      { title: "Mibro", subItems: ['Mibro Lite Smart Watch', 'Mibro X1 Smart Watch', 'Mibro Lite 2 Smart Watch', 'Mibro Watch A2', 'Mibro Watch C3', 'Mibro Watch T2', 'Mibro Smart Watch GS Pro'] },
      { title: "Amazfit", subItems: [ 'Amazfit GTR3 Pro Smart Watch', 'Amazfit T-Rex Pro Smart Watch', 'Amazfit GTS 2 Smart Watch', 'Amazfit T-Rex Ultra Smart Watch'] },
      { title: "Oppo", subItems: ['oppo watch','oppo band style'] },
      { title: "Kieslect", subItems: ['Kieslect KR(BT Calling) Smart Watch', 'Kieslect KS Calling Smart Watch', 'Kieslect Kr Pro Calling Smart Watch', 'Kieslect Ks Pro Calling Smart Watch', 'Kieslect Lora 2 Bluetooth Calling Smart Watch'] },
      { title: "Yolo", subItems: [ 'Yolo Pro Smart Watch', 'Yolo Watch Fortuner', 'Yolo Watch Pro Max', 'Yolo Thunder Smartwatch', 'Yolo Epic Smart Watch', 'Yolo Fortuner Pro Smart Watch', 'Yolo Ultron Smart Watch' ] },
      { title: "Fitbit", subItems: ['Fitbit Versa 4', 'Fitbit Sense', 'Fitbit Inspire 2', 'Fitbit Versa 3', 'Fitbit Versa 2', 'Fitbit Charge 4 Fitness Band'] },
      { title: "Realme", subItems: [] },
      { title: "huawei", subItems: [] },
      { title: "Zeblaze", subItems: [] },
      { title: "Joyroom", subItems: [] },
      { title: "Haylou", subItems: [] },
      { title: "Blulory", subItems: [] },
      { title: "Other Watches", subItems: [] },
      { title: "Haino", subItems: [] },
      { title: "Mi", subItems: [] },
      { title: "Xcess", subItems: [] }
    ]
  },
  {
    title: 'Accessories',
    subItems: [
      {title: 'Mobile Accessories', subItems: ['Wall Chargers', 'Wireless Chargers', 'Cables', 'Headphones & Headset', 'Smartwatches & Accessories', 'Selfie Sticks', 'Phone Camera Flash Lights', 'Docks & Stands', 'Car Chargers', 'Fashion Mobile Accessories', 'Cables & Converters', 'Car Mounts', 'Phone Cases', 'Screen Protectors', 'Phone Batteries', 'Power Banks', 'Mobile Parts & Tools'] },
      {title:'Computer & Laptop Assessories'}
    ]
  }
];

export default navData;
