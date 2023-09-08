export const sliderItems = [
  {
    id: 1,
    img: "assets/Images/SliderImg1.png",
    title: "МЕСТНО ПРОИЗВОДСТВО",
    desc: "ПРЕСНИ ПРОДУКТИ НА ДОСТЪПНИ ЦЕНИ. ГАРАНТИРАНО КАЧЕСТВО НА ПРОДУКТИТЕ.",
    bg: "effdea",
  },
  {
    id: 2,
    img: "assets/Images/SliderImg2.png",
    title: "ПОДКРЕПЯ МАЛКИЯ БИЗНЕС",
    desc: "ПРЕДЛАГАМЕ СРЕДА ЗА РАЗВИТЕ НА МАЛКИ ПРОИЗВОДИТЕЛИ КАКТО И НА ГОЛЕМИ.",
    bg: "fcf1ed",
  },
  {
    id: 3,
    img: "assets/Images/SliderImg3.png",
    title: "ЕКСПРЕСНИ ДОСТАВКИ",
    desc: "ДОСТАВКИ В РАМКИТЕ НА 1-2 РАБОТНИ ДНИ В ЗАВИСИМОСТ ОТ РАСТОЯНИЕТО.",
    bg: "f7fffb",
  },
];

export const Locations = [
  {
    id: 1,
    img: "assets/Images/CoatOfArms/SofiaCoA.png",
    title: "София",
    city: "София",
  },
  {
    id: 2,
    img: "assets/Images/CoatOfArms/VarnaCoA.png",
    title: "Варна",
    city: "Варна",
  },
  {
    id: 3,
    img: "assets/Images/CoatOfArms/PlovdivCoA.png",
    title: "Пловдив",
    city: "Пловдив",
  },
  {
    id: 4,
    img: "assets/Images/CoatOfArms/RuseCoA.png",
    title: "Русе",
    city: "Русе",
  },
  {
    id: 5,
    img: "assets/Images/CoatOfArms/StaraZagoraCoA.png",
    title: "Стара Загора",
    city: "Стара Загора",
  },
  {
    id: 6,
    img: "assets/Images/CoatOfArms/BurgasCoA.png",
    title: "Бургас",
    city: "Бургас",
  },
];

export const ItemsList = [
  {
    id: 1,
    title: "Домати Био - 1кг",
    price: 4.99,
    img: "assets/Images/tomatos.png",
    desc: "Пресни био домати отглеждани без пестициди.",
  },
  {
    id: 2,
    title: "Моркови Био - 1кг",
    price: 3.99,
    img: "assets/Images/carrots.png",
    desc: "Пресни био моркови отглеждани без пестициди.",
  },
  {
    id: 3,
    title: "Домашно краве сирене - 500г",
    price: 7.99,
    img: "assets/Images/cheese.png",
    desc: "Прясно сирене от мляко на крави хранени само с прясна трева.",
  },
  {
    id: 4,
    title: "Яйца - 8бр.",
    price: 2.99,
    img: "assets/Images/eggs.png",
    desc: "Яйца от щастливи кокошки хранени само с високо качествена зърнена култура.",
  },
  {
    id: 5,
    title: "Домати България - 2кг",
    price: 6.99,
    img: "assets/Images/tomatos.png",
    desc: "Пресни български розови домати отглеждани без пестициди.",
  },
  {
    id: 6,
    title: "Моркови България - 2кг",
    price: 5.99,
    img: "assets/Images/carrots.png",
    desc: "Български моркови отглеждани без пестициди в оранжерия.",
  },
  {
    id: 7,
    title: "Домашно козе сирене - 750г",
    price: 8.99,
    img: "assets/Images/cheese.png",
    desc: "Прясно сирене от козе мляко хранени само с трева и люцерна.",
  },
  {
    id: 8,
    title: "Яйца - 16бр.",
    price: 5.49,
    img: "assets/Images/eggs.png",
    desc: "Яйца от щастливи кокошки хранени само с високо качествена зърнена култура.",
  },
];

export function getItemData(id) {
  let itemData = ItemsList.find((item) => item.id === id);

  if (itemData === undefined) {
    console.log("Item data does not exist for ID: " + id);
    return undefined;
  }

  return itemData;
}
