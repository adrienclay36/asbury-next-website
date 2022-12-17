import React from 'react'
import { Menu } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { SubNav } from './navbar';

interface Props {
  items?: SubNav[];
  control: React.ReactNode;
  size?: string;
}

const SubMenu: React.FC<Props> = ({ items, control, size }) => {
  const router = useRouter();
  return (
    <Menu trigger="hover" withArrow shadow="xl" position="bottom">
      <Menu.Target>
        {control}
      </Menu.Target>
      <Menu.Dropdown>

        {
          items && items.map((item: SubNav) => (
            
            <Menu.Item key={item.title} icon={item.icon ? item.icon : ''} onClick={() => router.push(item.href)}>{item.title}</Menu.Item>
            
            ))
          }
          </Menu.Dropdown>
    </Menu>
  )
}

export default SubMenu;