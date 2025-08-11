import "../company_information.scss";

const Screen = ({ selectedPage }) => {
  return (
    <div className="screen_container">
      <iframe
        id="myFrame"
        src={`https://test-sigma-dun-34.vercel.app/user/7224A7CA437F/${selectedPage}`}
        width="100%"
        height="560"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        title="Kullanıcı Profili"
      />
    </div>
  );
};

export default Screen;
