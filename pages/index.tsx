import {NextPage} from 'next'
import {Button,Layout} from 'antd'
import Toast from './compoment/toast'

import styles from './index.module.less'
const {Content} = Layout
const Home: NextPage = ()=>{
  const handleClick = ()=>{
    Toast.info('123eq')
  }
  return (
    <Layout>
      <Content>
      <h1 className={styles.h1}>21313</h1>
      <Button type='primary' onClick={handleClick}>123</Button>
      </Content>
    </Layout>
    
  )
}
export default Home