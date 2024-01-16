const Homepage = () => {
  return (
    <div className="container mx-auto py-16">
      <div className="flex flex-col w-full items-center justify-center mb-24">
        <h1 className="text-blue-900 text-4xl font-bold text-center w-full max-w-lg mb-0.1 h-16 z-0 flex items-center justify-center">
          Home page
        </h1>
        <br></br>
        <br></br>
        <br></br>
        <p className="text-2xl text-justify w-full max-w-2xl">
          <span className="text-blue-900 font-bold">
            This is home of MonetizeAd
          </span>{" "}
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
