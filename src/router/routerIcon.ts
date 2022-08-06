/*
 * @Author: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Date: 2022-07-31 19:25:00
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-06 18:02:57
 * @FilePath: /vue3-template/src/router/routerIcon.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { renderIcon } from '@/utils/index';
import { 
  DashboardOutlined,
  SettingOutlined,
  KeyOutlined,
  UserOutlined
} from '@vicons/antd';

export const constantRouterIcon = {
  DashboardOutlined: renderIcon(DashboardOutlined),
  SettingOutlined: renderIcon(SettingOutlined),
  KeyOutlined: renderIcon(KeyOutlined),
  UserOutlined: renderIcon(UserOutlined),
};
