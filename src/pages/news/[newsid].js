import RootLayout from "@/components/Layouts/RootLayout";
import { Col, Image, Row } from "antd";
import {
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useGetSingleNewsQuery } from "@/redux/api";

const NewsDetails = ({ ids }) => {
  const { data, isLoading } = useGetSingleNewsQuery(ids.newsid);

  const news = data;

  console.log(news);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={12}>
          <div>
            <Image
              src={news?.image_url}
              width={500}
              height={300}
              responsive
              alt="news image"
            />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div>
            <h1> {news?.title}</h1>
            <div
              className="line"
              style={{
                height: "5px",
                margin: "20px 0",
                background: "#000",
                width: "100%",
              }}
            ></div>

            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                color: "gray",
                margin: "10px 0px",
                fontSize: "12px",
              }}
            >
              <span>
                <CalendarOutlined /> {news?.release_date}
              </span>
              <span>
                <CommentOutlined /> {news?.comment_count} COMMENTS
              </span>
              <span>
                <ProfileOutlined /> {news?.category}
              </span>
            </p>

            <p style={{ fontSize: "20px" }}>{news?.description}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NewsDetails;

// export const getStaticPaths = async () => {
//   const res = await fetch(`http://localhost:5000/news`);
//   const data = await res.json();

//   const paths = data.map((news) => ({
//     params: { newsid: `${news.id}` },
//   }));

//   return { paths, fallback: false };
// };

NewsDetails.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  // const res = await fetch(`http://localhost:5000/news/${params.newsid}`);
  // const data = await res.json();

  return {
    props: {
      ids: params,
    },
  };
};
