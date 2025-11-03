const ROWS = 10;
const SEATS_PER_ROW = 10;
const SEATS_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const seats = Array.from({ length: ROWS }, () => {
  return Array(SEATS_PER_ROW).fill(0);
});

const SeatsDistribution = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="px-[100px] w-full md:px-[200px] py-2 bg-black text-white text-xl font-bold text-center block md:inline rounded-xl mb-10">
          SCREEN
        </div>
        <div className="flex flex-col gap-1 md:gap-2 px-4">
          {seats.map((rowEl, indexRow) => {
            return (
              <div
                className="flex items-center font-bold"
                key={`${rowEl}${indexRow}`}
              >
                <div className="w-8 md:w-10">{indexRow + 1}</div>
                <div className="flex gap-3 md:gap-5">
                  {rowEl.map((seat, indexSeat) => {
                    return (
                      <div
                        className="flex flex-col justify-center items-center gap-1 font-bold"
                        key={`${seat}${indexSeat}`}
                      >
                        {indexRow === 0 ? (
                          <div>{SEATS_LETTERS[indexSeat]}</div>
                        ) : (
                          ""
                        )}
                        <div
                          key={indexRow + indexSeat}
                          className="bg-red-500 h-5 w-5 md:h-10 md:w-10 rounded-t-3xl flex justify-center items-center font-bold text-white hover:bg-red-800 cursor-pointer"
                        >
                          {seat === 1 ? "X" : ""}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SeatsDistribution;
