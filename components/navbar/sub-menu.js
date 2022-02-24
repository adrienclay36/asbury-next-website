import React from 'react'
import { Menu } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router';
const SubMenu = ({ items, control, size }) => {
  const router = useRouter();
  return (
    <Menu trigger="hover" withArrow shadow="xl" position="bottom" placement="center" control={control} size={size}>
        {
            items.map(item => (
             
                <Menu.Item key={item.title} icon={item.icon ? item.icon : ''} onClick={() => router.push(item.href)}>{item.title}</Menu.Item>
              
            ))
        }
    </Menu>
  )
}

export default SubMenu;