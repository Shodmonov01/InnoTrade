import SvgColor from 'src/components/svg-color';
import { AiOutlineReconciliation } from "react-icons/ai";
import { MdOutlineStore, MdPointOfSale } from "react-icons/md";
import { TbShoppingCartQuestion, TbShoppingCartShare } from "react-icons/tb";
import { PiUsersThree } from "react-icons/pi";
import { LiaCopyrightSolid } from "react-icons/lia";
import { IoIosLogOut } from "react-icons/io";




// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Продажи',
    path: '/products',
    icon: <MdPointOfSale  size={25}/>,
  },
  {
    title: 'Остатки',
    path: '/leftovers',
    icon: <TbShoppingCartQuestion size={25}/>
    ,
  },
  {
    title: 'Отгрузки',
    path: '/shipment',
    icon: <TbShoppingCartShare size={25}/>
    ,
  },
  {
    title: 'Рекомендации',
    path: '/recomend',
    icon: <AiOutlineReconciliation size={25}/>
    ,
  },
  {
    title: 'Склад',
    path: '/storehouse',
    icon: <MdOutlineStore size={25}/>    ,
  },
  {
    title: 'Пользователи',
    path: '/user',
    icon: <PiUsersThree size={25}/>
    ,
  },

  {
    title: 'Фирмы',
    path: '/blog',
    icon: <LiaCopyrightSolid size={25}/>
    ,
  },
  {
    title: 'Выйти',
    path: '/login',
    icon: <IoIosLogOut size={25}/>
    ,
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
