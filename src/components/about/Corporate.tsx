import { motion } from "framer-motion";

const Corporate = () => {
  return (
    <div className="py-8 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-6 text-gray-700"
      >
        <p className="text-lg">
          Cosmos adalah salah satu merk elektronik rumah tangga Indonesia pertama yang memegang teguh komitmen terhadap standar tinggi dalam teknologi dan kualitas. Dibawah naungan PT. Star Cosmos, produk – produk Cosmos dirancang dan diproduksi untuk selalu menjadi inovator dan pelopor dalam industri produk perlengkapan rumah tangga sehingga selalu dicintai oleh konsumen Indonesia dari masa ke masa.
        </p>
        <p className="text-lg">
          Cosmos telah menjadi bagian dari keluarga Indonesia sejak tahun 1976 dan selalu berinovasi menghadirkan produk yang memenuhi kebutuhan gaya hidup sehat para keluarga Indonesia.
        </p>
        <p className="text-lg">
          Inovasi pertama dari Cosmos adalah produk Sarana Penyimpan Beras (SPB), yang berhasil menjadi terobosan pasar dan juga merupakan identitas Cosmos dengan taglinenya yang legendaris dan masih menempel di benak konsumen hingga saat ini yaitu “Ingat Beras Ingat Cosmos”. Berawal dari kepedulian Cosmos terhadap kebiasaan masyarakat Indonesia yang menyimpan beras di dalam karung, sehingga sering digigit tikus & banyak kutu / serangga, sedangkan beras merupakan kebutuhan pangan yang kita konsumsi setiap hari. Maka Cosmos berinovasi menciptakan produk Sarana Penyimpan Beras agar beras lebih bersih / higienis.
        </p>
        <p className="text-lg">
          Cosmos juga berinovasi menciptakan TONGOLAN pada Rice Cooker, dimana berfungsi membuat nasi menjadi lebih pulen.  Selain Tongolan, Cosmos juga menjadi Pelopor Rice Cooker Anti Gores di Indonesia, dengan inovasi teknologi HARMOND yaitu Teknologi Anti Gores pada Rice Cooker Harmond Series yang diproses dengan teknologi khusus & didinginkan ke temperature mendekati 0 derajat Celcius, membuat Rice Cooker Anti Gores, tidak terkelupas, & lebih sehat.
        </p>
        <p className="text-lg">
          Pada tahun 2016, Cosmos juga memproduksi Produk Blender Cosmos Blenz  dengan inovasi teknologi BLENZ yaitu teknologi pintar dari Cosmos yang mengatur blender bisa BERHENTI SENDIRI. Sekali pencet, Bisa Ngeblenz Sendiri, Bisa BERHENTI SENDIRI, Hasil Lebih Halus. Keluarga Cosmos jadi tidak perlu mengaduk manual saat proses blender, dan karena bisa BERHENTI SENDIRI, blender tidak perlu ditunggu, sehingga bisa sambil melakukan aktivitas lainnya.
        </p>
        <p className="text-lg">
          Cosmos juga mengeluarkan inovasi terbaru pada Kipas Angin Cosmos ONY Series, dimana kipas angin Cosmos ONY Series dilengkapi Pengusir Nyamuk Elektrik tipe matt, tidak hanya membuat ruangan lebih sejuk, Keluarga Cosmos juga terbebas dari gigitan nyamuk. Sekali colok, anginnya dahsyat nyamuknya minggat.
        </p>
        <p className="text-lg">
          Sejak tahun 2000, Cosmos secara konsisten mendapatkan berbagai penghargaan seperti Indonesia Good Design, dan berbagai penghargaan lainnya sebagai bukti pengakuan konsumen atas produk Cosmos yang berkualitas & terpercaya.
        </p>
        <p className="text-lg">
          Saat Ini Cosmos memiliki Service Centre Resmi dan Pusat Layanan Resmi yang tersebar di seluruh Indonesia untuk melayani dan menjaga kepuasan pelanggan Cosmos di Indonesia. PT Star Cosmos berfokus pada hubungan bisnis jangka panjang melalui kepuasan pelanggan, inovasi produk, menjaga hubungan baik dengan saluran distribusi dan upaya pemasaran untuk mencapai target.
        </p>
        <p className="text-lg">
          PT. Star Cosmos kini telah mengoperasikan 15 cabang dengan ribuan karyawan yang tersebar di seluruh Indonesia untuk membantu perusahaan mendistribusikan produk Cosmos ke para Dealer Cosmos. Saat ini, terdapat sekitar 1.000 Dealer yang secara direct yang menjual produk Cosmos. Dealer Cosmos tersebut kemudian mendistribusikan produk Cosmos ke kurang lebih 15.000 Retailer di Seluruh Indonesia baik di traditional market, modern market, dan juga penjualan online (e-commerce & marketplace) sehingga masyarakat Indonesia dapat membeli produk Cosmos dengan mudah.
        </p>
        <p className="text-lg">
          Sesuai dengan tagline terbarunya yaitu #BanggaCosmos, Cosmos bangga telah menjadi bagian dari Keluarga Indonesia dari generasi ke generasi. Produk Cosmos membantu menciptakan momen penting untuk dinikmati bersama keluarga. Cosmos terus berkomitmen untuk meningkatkan kepuasan pelanggan dan selalu berinovasi menghadirkan produk berkualitas yang dibutuhkan Keluarga Indonesia.
        </p>
        <p className="text-xl font-bold text-secondary">#BanggaCosmos</p>
      </motion.div>
    </div>
  );
};

export default Corporate;
