import { Link as RouterLink, useMatch } from 'react-router-dom';

const CustomLink = ({ to, children }:{
    to:any,
    children:any
}) => {
  const isMatch = useMatch({ path: to, end: true }); 

  return (
    <li className="p-4"> 
      <RouterLink 
        to={to} 
        className={`text-gray-500 hover:text-amber-500 transition-colors duration-200 ${
          isMatch ? 'font-bold text-amber-50 border-b-2 border-amber-500' : '' 
        }`} 
      >
        {children}
      </RouterLink>
    </li>
  );
};

export default CustomLink;