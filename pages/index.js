import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import renderHTML from 'react-render-html';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import MainLayout from "../components/Layout/MainLayout"

export default function Home(props) {

  return (
    <>
      <Head>
        <meta charset='utf-8' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <meta name='description' content='Description' />
        <meta name='keywords' content='Keywords' />
        <link rel="manifest" href="/manifest.json" />
        <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <MainLayout>
        <Row>
          {props.posts.map(post =>
            <Col className="mb-4 d-flex " sm="12" md="4" xl="3">
              <div>
                <Card className="h-100">
                  <CardImg top width="100%" src={post.uagb_featured_image_src.mediumcover[0] ? post.uagb_featured_image_src.mediumcover[0] : "https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png"} alt="Card image cap" />
                  <CardBody>
                    <CardTitle tag="h5">{renderHTML(post.title.rendered)}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle>
                    <CardText>{renderHTML(post.excerpt.rendered)}</CardText>
                  </CardBody>
                </Card>
              </div>
            </Col>
          )}
        </Row>
      </MainLayout>
    </>)
}
export async function getServerSideProps() {
  let posts;
  await Axios.get("https://ewebs.ir/nxp/wp-json/wp/v2/posts").then((res) => {
    posts = res.data
  })
  return {
    props: {
      posts
    }
  }
} 
