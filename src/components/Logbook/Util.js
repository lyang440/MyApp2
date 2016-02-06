// display属性的改变
function cssDisplay(value) {
  if (value) {
    return {
      display: 'block'
    };
  }

  return {
    display: 'none'
  };
}

// 根据mood显示对应的心情
function moodImgSrc(mood) {
  if (!mood) {
    return '';
  }

  return {
    grinning: "/public/img/mood1.png",
    smile: "/public/img/mood2.png",
    neutralFace: "/public/img/mood3.png",
    disappointed: "/public/img/mood4.png"
  }[mood];
}

export { cssDisplay, moodImgSrc };
