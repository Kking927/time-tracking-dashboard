const timeframeButtons = document.querySelectorAll(
  ".profile-card__nav-btn"
);

const activityCards = document.querySelectorAll(
  ".activity-card"
);


async function getActivityData() {
  try {
    const response = await fetch("./data.json");

    if (!response.ok) {
      throw new Error("Could not fetch data.json");
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("Error loading data:", error);
  }
}


function updateCards(data, timeframe) {

  activityCards.forEach((card) => {

    const title = card.dataset.title;

    const activity = data.find(
      (item) => item.title === title
    );

    if (!activity) {
      console.error(`No data found for ${title}`);
      return;
    }

    const currentTime = card.querySelector(
      ".activity-card__time-current"
    );

    const previousTime = card.querySelector(
      ".activity-card__time-previous"
    );


    const currentHours =
      activity.timeframes[timeframe].current;

    const previousHours =
      activity.timeframes[timeframe].previous;


    currentTime.textContent = `${currentHours}hrs`;


    if (timeframe === "daily") {

      previousTime.textContent =
        `Yesterday - ${previousHours}hrs`;

    } else if (timeframe === "weekly") {

      previousTime.textContent =
        `Last Week - ${previousHours}hrs`;

    } else if (timeframe === "monthly") {

      previousTime.textContent =
        `Last Month - ${previousHours}hrs`;
    }
  });
}


async function init() {

  const data = await getActivityData();

  if (!data) {
    return;
  }


  timeframeButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const timeframe = button.dataset.timeframe;

      console.log("Button clicked:", timeframe);


      timeframeButtons.forEach((button) => {
        button.classList.remove("is-active");
      });


      button.classList.add("is-active");


      updateCards(data, timeframe);
    });

  });


  // Start with Weekly
  updateCards(data, "weekly");
}


init();
