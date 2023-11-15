// import React from "react";
// const healthServiceStyle = {
//   image: {
//     float: "right", // Đặt float thành right để đưa hình ảnh về bên phải
//     maxWidth: "100%", // Đảm bảo hình ảnh không vượt quá kích thước của container
//     height: "auto",
//   },
// };

// function HealthService() {
//   return (
//     <div className="container health-service-container">
//       <div className="row">
//         <div className="col-lg-6 col-md-12">
//           <h2>Why should you use DrugMart's health services?</h2>
//           <p>
//             Accompanying every Vietnamese family on the journey to master their
//             lives and improve the quality of comprehensive health care. DrugMart
//             enhances service deployment and cooperates with reputable and
//             reliable medical facilities to bring peace of mind and trust to
//             people, and at the same time to meet the needs of serving customers
//             quickly and easily. Easy, convenient and effective right on the
//             DrugMart application.
//           </p>

//           <p>
//             Furthermore, customers have additional health solutions to be more
//             proactive in taking care of themselves and their families anytime,
//             anywhere. In the future, DrugMart will cooperate with units in new
//             fields to bring greater value to the community and contribute to the
//             overall development of the health industry, thereby providing
//             optimal solutions. protect and help improve the health of Vietnamese
//             people.
//           </p>
//         </div>
//       </div>
//       <div></div>
//       <img
//         src="/assets/img/healthService.jpg"
//         alt=""
//         style={healthServiceStyle.image}
//       />
//     </div>
//   );
// }

// export default HealthService;

import React from "react";
// Tạo một tệp CSS riêng để tùy chỉnh giao diện

const healthServiceStyle = {
  image: {
    float: "right", // Đặt float thành right để đưa hình ảnh về bên phải
    maxWidth: "100%", // Đảm bảo hình ảnh không vượt quá kích thước của container
    height: "auto",
  },
};

function HealthService() {
  return (
    <div className="container health-service-container">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <h2>Why should you use DrugMart's health services?</h2>
          <p>
            Accompanying every Vietnamese family on the journey to master their
            lives and improve the quality of comprehensive health care. DrugMart
            enhances service deployment and cooperates with reputable and
            reliable medical facilities to bring peace of mind and trust to
            people, and at the same time to meet the needs of serving customers
            quickly and easily. Easy, convenient and effective right on the
            DrugMart application.
          </p>
          <p>
            Furthermore, customers have additional health solutions to be more
            proactive in taking care of themselves and their families anytime,
            anywhere. In the future, DrugMart will cooperate with units in new
            fields to bring greater value to the community and contribute to the
            overall development of the health industry, thereby providing
            optimal solutions. protect and help improve the health of Vietnamese
            people.
          </p>
        </div>
        <div className="col-lg-6 col-md-12">
          {/* Bạn có thể thêm một div bao quanh hình ảnh để kiểm soát kích thước và cách hiển thị */}
          <div className="image-container">
            <img
              src="/assets/img/healthService.jpg"
              alt=""
              style={healthServiceStyle.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthService;
