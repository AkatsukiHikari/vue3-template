/*
 * @Author: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Date: 2022-08-06 20:07:55
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @LastEditTime: 2022-08-06 20:07:56
 * @FilePath: /vue3-template/src/settings/componentSetting.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
    table: {
      apiSetting: {
        // 当前页的字段名
        pageField: 'page',
        // 每页数量字段名
        sizeField: 'pageSize',
        // 接口返回的数据字段名
        listField: 'list',
        // 接口返回总页数字段名
        totalField: 'pageCount',
      },
      //默认分页数量
      defaultPageSize: 10,
      //可切换每页数量集合
      pageSizes: [10, 20, 30, 40, 50],
    },
    upload: {
      //考虑接口规范不同
      apiSetting: {
        // 集合字段名
        infoField: 'data',
        // 图片地址字段名
        imgField: 'photo',
      },
      //最大上传图片大小
      maxSize: 2,
      //图片上传类型
      fileType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg+xml'],
    },
};
  