import skinTexture from "@/assets/derm-skin-texture.jpg";
import serum from "@/assets/derm-serum.jpg";
import laser from "@/assets/derm-laser.jpg";
import pediatric from "@/assets/derm-pediatric.jpg";
import face from "@/assets/derm-face.jpg";
import diagram from "@/assets/derm-diagram.jpg";

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  /** HTML content with inline <img> / <figure> blocks */
  content: string;
  thumbnail: string;
  categorySlug: string;
  publishedAt: string; // ISO date
  author: string;
  readingMinutes: number;
};

export const categories: Category[] = [
  { id: "c1", name: "Bệnh da liễu", slug: "benh-da-lieu" },
  { id: "c2", name: "Triệu chứng", slug: "trieu-chung" },
  { id: "c3", name: "Chăm sóc da", slug: "cham-soc-da" },
  { id: "c4", name: "Điều trị", slug: "dieu-tri" },
  { id: "c5", name: "Mỹ phẩm & Hoạt chất", slug: "my-pham-hoat-chat" },
  { id: "c6", name: "Da liễu trẻ em", slug: "da-lieu-tre-em" },
  { id: "c7", name: "Da đầu & Tóc", slug: "da-dau-toc" },
  { id: "c8", name: "Hỏi đáp da liễu", slug: "hoi-dap-da-lieu" },
  { id: "c9", name: "Nghiên cứu & Tin tức", slug: "nghien-cuu-tin-tuc" },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const assetImages = { skinTexture, serum, laser, pediatric, face, diagram };

const body = (lead: string, inlineImg: string) => `
  <p class="lead">${lead}</p>
  <p>Hàng rào bảo vệ da (skin barrier) đóng vai trò trung tâm trong việc duy trì độ ẩm và ngăn cản các tác nhân gây kích ứng từ môi trường. Khi lớp này bị tổn thương, da trở nên nhạy cảm, khô ráp và dễ viêm hơn.</p>
  <h2>Cơ chế sinh học</h2>
  <p>Các nghiên cứu gần đây cho thấy thành phần lipid giữa các tế bào sừng — bao gồm ceramide, cholesterol và acid béo tự do — quyết định phần lớn khả năng giữ nước của da. Tỉ lệ mất cân bằng giữa các thành phần này thường gặp ở những người có cơ địa viêm da cơ địa.</p>
  <figure>
    <img src="${inlineImg}" alt="Minh hoạ cấu trúc da" loading="lazy" />
    <figcaption>Hình 1. Minh hoạ các lớp cấu trúc của da và quá trình giữ ẩm.</figcaption>
  </figure>
  <p>Việc phục hồi hàng rào da cần kết hợp dưỡng ẩm đúng cách, tránh các chất tẩy rửa mạnh và bảo vệ da khỏi tia UV. Quá trình này thường mất từ 4 đến 8 tuần để thấy cải thiện rõ rệt.</p>
  <h3>Khuyến nghị thực hành</h3>
  <ul>
    <li>Dùng sữa rửa mặt dịu nhẹ, độ pH gần với da (5.5).</li>
    <li>Thoa kem dưỡng chứa ceramide ngay sau khi rửa mặt.</li>
    <li>Sử dụng kem chống nắng phổ rộng SPF 30+ mỗi ngày.</li>
  </ul>
  <blockquote>Phục hồi hàng rào da là nền tảng của hầu hết các phác đồ điều trị da liễu hiện đại.</blockquote>
  <p>Bệnh nhân nên tham khảo ý kiến bác sĩ da liễu trước khi bắt đầu bất kỳ hoạt chất mạnh nào như retinoid hoặc acid tẩy tế bào chết, đặc biệt khi da đang trong giai đoạn kích ứng.</p>
`;

export const articles: Article[] = [
  {
    id: "a1",
    title: "Vai trò của hệ vi sinh vật da trong viêm da cơ địa kháng trị",
    slug: "he-vi-sinh-vat-da-viem-da-co-dia",
    excerpt:
      "Các nghiên cứu dọc gần đây cho thấy sự đa dạng vi sinh đóng vai trò quan trọng hơn trong phục hồi hàng rào da so với những gì từng được ghi nhận.",
    content: body(
      "Hệ vi sinh vật da là một quần thể phức tạp ảnh hưởng trực tiếp đến sức khoẻ và khả năng tự phục hồi của làn da.",
      diagram,
    ),
    thumbnail: skinTexture,
    categorySlug: "benh-da-lieu",
    publishedAt: "2024-10-24",
    author: "BS. Nguyễn Minh Hà",
    readingMinutes: 8,
  },
  {
    id: "a2",
    title: "Niacinamide: Vượt ra ngoài chức năng phục hồi hàng rào da",
    slug: "niacinamide-chuc-nang-hang-rao-da",
    excerpt:
      "Hiểu về tác dụng hiệp đồng của Vitamin B3 khi kết hợp với retinoid bôi tại chỗ trong các phác đồ chống lão hoá.",
    content: body(
      "Niacinamide (Vitamin B3) là một trong những hoạt chất được nghiên cứu nhiều nhất với hồ sơ an toàn rất tốt.",
      serum,
    ),
    thumbnail: serum,
    categorySlug: "my-pham-hoat-chat",
    publishedAt: "2024-10-21",
    author: "DS. Trần Thu Phương",
    readingMinutes: 6,
  },
  {
    id: "a3",
    title: "Tiến bộ trong điều trị laser xung nhuộm cho tổn thương mạch máu",
    slug: "laser-xung-nhuom-ton-thuong-mach-mau",
    excerpt:
      "Đánh giá các công nghệ làm mát mới cho phép tăng năng lượng mà không làm tăng khó chịu hay thời gian phục hồi.",
    content: body(
      "Laser xung nhuộm (PDL) là tiêu chuẩn vàng trong xử lý các tổn thương mạch máu nông trên da.",
      laser,
    ),
    thumbnail: laser,
    categorySlug: "dieu-tri",
    publishedAt: "2024-10-18",
    author: "BS. Lê Hoàng Nam",
    readingMinutes: 7,
  },
  {
    id: "a4",
    title: "Quản lý mụn trứng cá ở người trưởng thành: phác đồ toàn diện",
    slug: "quan-ly-mun-trung-ca-nguoi-truong-thanh",
    excerpt:
      "Tìm hiểu mối liên hệ nội tiết phía sau tình trạng mụn dai dẳng và các can thiệp điều trị hiện đại.",
    content: body(
      "Mụn trứng cá ở người trưởng thành thường liên quan đến yếu tố nội tiết và đòi hỏi tiếp cận khác với mụn tuổi dậy thì.",
      face,
    ),
    thumbnail: face,
    categorySlug: "benh-da-lieu",
    publishedAt: "2024-10-15",
    author: "BS. Phạm Quỳnh Anh",
    readingMinutes: 9,
  },
  {
    id: "a5",
    title: "Chàm sữa ở trẻ sơ sinh: các hướng điều trị không corticoid",
    slug: "cham-sua-tre-so-sinh-khong-corticoid",
    excerpt:
      "Hướng dẫn cho cha mẹ nhận biết sớm dấu hiệu viêm da cơ địa và kiểm soát các đợt bùng phát một cách an toàn.",
    content: body(
      "Chàm sữa (viêm da cơ địa ở trẻ nhỏ) cần được chăm sóc nhẹ nhàng với trọng tâm là phục hồi và duy trì hàng rào da.",
      pediatric,
    ),
    thumbnail: pediatric,
    categorySlug: "da-lieu-tre-em",
    publishedAt: "2024-10-12",
    author: "BS. Đỗ Thanh Mai",
    readingMinutes: 5,
  },
  {
    id: "a6",
    title: "SPF 50 mỗi ngày: giải mã những lầm tưởng về chống nắng",
    slug: "spf-50-lam-tuong-chong-nang",
    excerpt:
      "Phá bỏ những hiểu lầm phổ biến về phơi nắng trong ngày âm u và nguy cơ từ ánh sáng xanh trong nhà.",
    content: body(
      "Chống nắng phổ rộng hằng ngày là biện pháp đơn giản nhưng hiệu quả nhất để phòng ngừa lão hoá và ung thư da.",
      skinTexture,
    ),
    thumbnail: skinTexture,
    categorySlug: "cham-soc-da",
    publishedAt: "2024-10-09",
    author: "DS. Trần Thu Phương",
    readingMinutes: 6,
  },
  {
    id: "a7",
    title: "Tranexamic acid trong điều trị nám má: bằng chứng cập nhật",
    slug: "tranexamic-acid-dieu-tri-nam-ma",
    excerpt:
      "Cơ chế tác động của tranexamic acid đường bôi và đường uống trong kiểm soát tăng sắc tố.",
    content: body(
      "Tranexamic acid đang trở thành lựa chọn quan trọng trong điều trị nám má nhờ khả năng điều hoà sắc tố.",
      serum,
    ),
    thumbnail: serum,
    categorySlug: "dieu-tri",
    publishedAt: "2024-10-05",
    author: "BS. Nguyễn Minh Hà",
    readingMinutes: 7,
  },
  {
    id: "a8",
    title: "Rụng tóc androgen: tiếp cận chẩn đoán và điều trị",
    slug: "rung-toc-androgen-chan-doan-dieu-tri",
    excerpt:
      "Phân biệt rụng tóc androgen với các nguyên nhân khác và các lựa chọn điều trị có bằng chứng.",
    content: body(
      "Rụng tóc androgen là dạng rụng tóc phổ biến nhất, liên quan đến yếu tố di truyền và nội tiết.",
      diagram,
    ),
    thumbnail: laser,
    categorySlug: "da-dau-toc",
    publishedAt: "2024-10-02",
    author: "BS. Lê Hoàng Nam",
    readingMinutes: 8,
  },
  {
    id: "a9",
    title: "Khi nào cần đi khám bác sĩ da liễu? 7 dấu hiệu cảnh báo",
    slug: "khi-nao-can-kham-bac-si-da-lieu",
    excerpt:
      "Những thay đổi trên da bạn không nên bỏ qua và nên đến gặp chuyên gia da liễu càng sớm càng tốt.",
    content: body(
      "Nhiều vấn đề da liễu có thể tự cải thiện, nhưng một số dấu hiệu cần được thăm khám chuyên khoa ngay.",
      face,
    ),
    thumbnail: face,
    categorySlug: "hoi-dap-da-lieu",
    publishedAt: "2024-09-28",
    author: "BS. Phạm Quỳnh Anh",
    readingMinutes: 5,
  },
  {
    id: "a10",
    title: "Nhận diện sớm triệu chứng vảy nến: từ mảng đỏ đến bong vảy",
    slug: "nhan-dien-som-trieu-chung-vay-nen",
    excerpt:
      "Hướng dẫn nhận biết các biểu hiện đặc trưng của vảy nến và phân biệt với các bệnh da khác.",
    content: body(
      "Vảy nến là bệnh viêm da mạn tính qua trung gian miễn dịch với biểu hiện lâm sàng đa dạng.",
      skinTexture,
    ),
    thumbnail: pediatric,
    categorySlug: "trieu-chung",
    publishedAt: "2024-09-24",
    author: "BS. Nguyễn Minh Hà",
    readingMinutes: 6,
  },
  {
    id: "a11",
    title: "Cập nhật nghiên cứu: chất ức chế JAK bôi trong vảy nến mảng",
    slug: "chat-uc-che-jak-boi-vay-nen-mang",
    excerpt:
      "Chất ức chế Janus kinase đường bôi mở ra hướng tiếp cận nhắm trúng đích cho viêm da mạn tính.",
    content: body(
      "Chất ức chế JAK đường bôi đại diện cho bước chuyển quan trọng trong điều trị các bệnh da viêm.",
      diagram,
    ),
    thumbnail: laser,
    categorySlug: "nghien-cuu-tin-tuc",
    publishedAt: "2024-09-20",
    author: "BS. Lê Hoàng Nam",
    readingMinutes: 9,
  },
  {
    id: "a12",
    title: "Routine dưỡng da tối giản cho da dầu mụn",
    slug: "routine-duong-da-toi-gian-da-dau-mun",
    excerpt:
      "Ba bước cốt lõi giúp kiểm soát dầu và mụn mà không làm tổn thương hàng rào bảo vệ da.",
    content: body(
      "Một quy trình dưỡng da tối giản nhưng đúng đắn thường hiệu quả hơn nhiều bước phức tạp.",
      serum,
    ),
    thumbnail: face,
    categorySlug: "cham-soc-da",
    publishedAt: "2024-09-16",
    author: "DS. Trần Thu Phương",
    readingMinutes: 5,
  },
];

export const articleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);

export function relatedArticles(article: Article, count = 4): Article[] {
  const sameCat = articles.filter(
    (a) => a.id !== article.id && a.categorySlug === article.categorySlug,
  );
  const others = articles.filter(
    (a) => a.id !== article.id && a.categorySlug !== article.categorySlug,
  );
  return [...sameCat, ...others].slice(0, count);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
