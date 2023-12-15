// Home.js
import React from "react";

function Home() {
  return (
    
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome to My Website</h1>
      <p className="text-lg mb-4">
        Explore our services and find what you're looking for!
      </p>
      <div className="grid gap-4">
        <ServiceCard
          title="Service 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel sapien vel mauris placerat dictum. Integer tincidunt velit eu justo tincidunt, a blandit elit vulputate. Maecenas in lacus ut quam suscipit rhoncus. Ut ullamcorper ullamcorper arcu, eu malesuada justo venenatis eu. Duis in orci non dui tincidunt fermentum nec nec velit. Quisque quis metus in nunc fringilla congue vel nec justo. Curabitur ac arcu quis metus volutpat tristique vel a purus. Sed ut arcu non urna commodo consectetur. Nullam imperdiet vel nunc in bibendum. Ut non bibendum libero."
        />
        <ServiceCard
          title="Service 2"
          description="Phasellus ac nulla ut dolor dictum imperdiet. Fusce vel leo vel libero interdum vehicula. Curabitur eu libero vel nulla congue rhoncus ac sit amet sem. Integer ac turpis id felis tincidunt posuere. In hac habitasse platea dictumst. Sed eu justo nec sapien auctor ullamcorper. Fusce pharetra risus eu nulla blandit, id suscipit turpis ultrices. Quisque euismod, odio vel euismod scelerisque, purus quam laoreet tellus, eu bibendum lectus lacus vel lectus. Proin laoreet justo sit amet interdum pellentesque. Duis posuere fermentum lectus, eu sodales justo eleifend nec."
        />
        <ServiceCard
          title="Service 3"
          description="Nulla facilisi. Vivamus tempus justo in risus lacinia, nec aliquet orci auctor. Duis sed tortor id dolor tristique ultrices vel vel ligula. Vivamus finibus odio ut metus congue, vel eleifend purus dignissim. Curabitur imperdiet sapien nec nibh hendrerit, eu tristique tortor aliquet. Sed euismod, urna ac fringilla volutpat, elit nisl facilisis ligula, vel facilisis velit est ut lacus. Integer nec justo in metus facilisis hendrerit. Morbi eget eros id urna vulputate hendrerit. Ut euismod eros in efficitur interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed sit amet venenatis purus."
        />
        {/* Add more service cards as needed */}
      </div>
    </div>
  );
}

// ServiceCard component (you can create a separate file for this component)
const ServiceCard = ({ title, description }) => (
  <div className=" p-4 rounded shadow-md">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;
