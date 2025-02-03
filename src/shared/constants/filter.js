const OTT_PLATFORMS = ["왓챠", "웨이브", "티빙"];
const OTT_PLATFORMS_IMAGE_SRC = {
  왓챠: "/images/ottPlatform/watcha.png",
  웨이브: "/images/ottPlatform/wavve.png",
  티빙: "/images/ottPlatform/tving.png",
};

const OTT_PROFILES = {
  왓챠: ["1번", "2번", "3번", "4번"],
  웨이브: ["1번", "2번", "3번", "4번"],
  티빙: ["1번", "2번", "3번", "4번"],
};

const OTT_ID = { 왓챠: 1, 웨이브: 2, 티빙: 3 };
const OTT_PROFILE_ID = {
  왓챠: {
    "1번": 1,
    "2번": 2,
    "3번": 3,
    "4번": 4,
  },
  웨이브: {
    "1번": 5,
    "2번": 6,
    "3번": 7,
    "4번": 8,
  },
  티빙: {
    "1번": 9,
    "2번": 10,
    "3번": 11,
    "4번": 12,
  },
};

const SORT_OPTIONS = ["시간순", "이름순", "플랫폼순"];

const INCLUSION_OPTIONS = ["내 예약만 보기", "모든 예약 보기"];

export {
  OTT_PLATFORMS,
  OTT_PLATFORMS_IMAGE_SRC,
  OTT_PROFILES,
  SORT_OPTIONS,
  INCLUSION_OPTIONS,
  OTT_ID,
  OTT_PROFILE_ID,
};
