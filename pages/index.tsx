import {NextPage} from 'next'
import {Button,Layout} from 'antd'

import styles from './index.module.less'
const {Content} = Layout
const Home: NextPage = ()=>{

  return (
    <Layout>
      <Content>
      <h1 className={styles.h1}>21313</h1>
      <Button type='primary'>123</Button>
      </Content>
    </Layout>
    
  )
}
export default Home