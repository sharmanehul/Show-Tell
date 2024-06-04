import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Write 20's</span>
        <span className="headerTitleLg">Show & Tell</span>
      </div>
      <img
        className="headerImg"
        src="https://i.pinimg.com/originals/1a/9f/6f/1a9f6fd2acfbc69c597cca5e038650b8.jpg"
        alt=""
      />
    </div>
  );
}
