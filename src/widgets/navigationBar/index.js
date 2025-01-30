import styles from "./style/index.module.css";
import { Link, useMatch } from "react-router-dom";

import { ReactComponent as HomeDefaultIcon } from "shared/assets/icons/navBar/home_default.svg";
import { ReactComponent as HomeSelectedIcon } from "shared/assets/icons/navBar/home_selected.svg";
import { ReactComponent as ProfileDefaultIcon } from "shared/assets/icons/navBar/profile_default.svg";
import { ReactComponent as ProfileSelectedIcon } from "shared/assets/icons/navBar/profile_selected.svg";
import { ReactComponent as RecordDefaultIcon } from "shared/assets/icons/navBar/record_default.svg";
import { ReactComponent as RecordSelectedIcon } from "shared/assets/icons/navBar/record_selected.svg";
import { ReactComponent as SearchDefaultIcon } from "shared/assets/icons/navBar/search_default.svg";
import { ReactComponent as SearchSelectedIcon } from "shared/assets/icons/navBar/search_selected.svg";
import { ReactComponent as ReserveDefaultIcon } from "shared/assets/icons/navBar/reserve_default.svg";
import { ReactComponent as ReserveSelectedIcon } from "shared/assets/icons/navBar/reserve_selected.svg";

import { motion } from "framer-motion";

function NavigationBar() {
  return (
    <div className={styles.container}>
      <NavButton
        link="/"
        defaultIcon={<HomeDefaultIcon />}
        selectedIcon={<HomeSelectedIcon />}
        txt="홈"
      />
      <NavButton
        link="/reservation-history"
        defaultIcon={<RecordDefaultIcon />}
        selectedIcon={<RecordSelectedIcon />}
        txt="장부"
      />
      <NavButton
        link="/reservation"
        defaultIcon={<ReserveDefaultIcon />}
        selectedIcon={<ReserveSelectedIcon />}
        txt="예약"
      />
      <NavButton
        link="/seat-search-filter"
        defaultIcon={<SearchDefaultIcon />}
        selectedIcon={<SearchSelectedIcon />}
        txt="검색"
      />
      <NavButton
        link="/my"
        defaultIcon={<ProfileDefaultIcon />}
        selectedIcon={<ProfileSelectedIcon />}
        txt="마이"
      />
    </div>
  );
}

function NavButton({ link, defaultIcon, selectedIcon, txt }) {
  const isLinkMatched = useMatch(link);
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link to={link} className={styles.navButton}>
        <div className={styles.icon}>{isLinkMatched ? selectedIcon : defaultIcon}</div>
        <div className={isLinkMatched ? styles.txtSelected : styles.txtDefault}>{txt}</div>
      </Link>
    </motion.div>
  );
}

export { NavigationBar };
