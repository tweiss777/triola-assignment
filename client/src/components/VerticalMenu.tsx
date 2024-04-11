import { Menu } from 'antd';
import { MenuItem } from '../types/MenuItem';
type IProps = {
    menuItems: MenuItem[]

}

export default function VerticalMenu(props: IProps) {
    function onClick(e: any){


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
