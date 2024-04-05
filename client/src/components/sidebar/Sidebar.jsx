import "./sidebar.css";

export default function Sidebar() {
  const hardcodedCategories = [
    { _id: 1, name: "Health" },
    { _id: 2, name: "Music" },
    { _id: 3, name: "Food" },
    { _id: 4, name: "Fitness" },
    { _id: 5, name: "Travel" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <p className="p-about">
          As the owner of this health forum, I'm passionate about empowering
          individuals to take charge of their well-being. Our forum is a space
          dedicated to sharing knowledge, fostering healthy habits, and
          supporting each other on our journeys to better health. Together,
          let's inspire wellness and build a community committed to thriving.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {hardcodedCategories.map((category) => (
            <li key={category._id} className="sidebarListItem">
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
