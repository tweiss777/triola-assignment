import { Menu } from 'antd';
import { MenuItem } from '../types/MenuItem';
import { useNavigate } from 'react-router-dom';
type IProps = {
    menuItems: MenuItem[]

}

export default function VerticalMenu(props: IProps) {
    const navigate = useNavigate();
    function onClick(e: any){
        navigate(e.key);
    }
    return <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={props.menuItems}
    />
}
