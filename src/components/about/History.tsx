import { motion } from "framer-motion";

const History = () => {
  return (
    <div className="py-8 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-6 text-gray-700"
      >
        <p className="text-lg">
          PT. Star Cosmos didirikan pada 17 September 1976 oleh Bapak Alam Surjaputra, pabrik pertama Cosmos dibangun di daerah Tangerang. Pemilihan nama Brand Cosmos berasal dari kata "kosmos" yang memiliki arti suatu sistem dalam alam semesta yang teratur atau harmonis. Berangkat dari ide tersebut, terciptalah Brand Cosmos yang artinya keharmonisan.
        </p>
        <p className="text-lg">
          Berawal dari concern terhadap banyaknya produk elektronik asal Jepang yang harganya sangat kompetitif, Bapak Alam Surjaputra yang merupakan Insinyur di bidang Teknik Elektro, mengambil satu terobosan pasar dengan memproduksi Sarana Penyimpan Beras (SPB) dan menjadi salah satu pioneer pertama produsen lokal untuk produk home appliances di Indonesia.
        </p>
        <p className="text-lg">
          Cosmos juga secara paralel memproduksi kipas angin dan rice cooker yang merupakan kebutuhan pokok elektronik keluarga di rumah. Di tahun 1980an, Cosmos melakukan perluasan pabrik kedua dan ketiga. Cosmos juga melakukan manufaktur radio kaset, televisi, mesin cuci, dan lemari es.
        </p>
        <p className="text-lg">
          Pada tahun 1991, Cosmos melakukan Technical Collaboration dengan Goldstar (sekarang LG) guna berkomitmen dalam membuat produk Cosmos berstandar Internasional dan meningkatkan kualitas dan sistem kerja perusahaan agar bisa bersaing dengan produk kelas internasional lainnya. Komitmen tersebut terbukti nyata hingga saat ini, Cosmos merupakan salah satu market leader di industri peralatan rumah tangga di pasar Indonesia.
        </p>
        <p className="text-lg">
          Pada tahun 1996, Cosmos berhasil mendapatkan sertifikasi Standar Nasional Indonesia (SNI) untuk produk Sarana Penyimpan Beras (SPB) dengan Sistem FIFO (First In First Out). Dari SNI ini, seluruh sarana penyimpan beras yang beredar di Indonesia diharuskan mengacu pada standar yang Cosmos telah tetapkan.
        </p>
        <p className="text-lg">
          Di tahun 2004, Cosmos menjadi pelopor inovasi Tongolan pada Rice Cooker agar nasi lebih pulen. Di tahun yang sama, Cosmos juga memproduksi Ketupat Cooker. Pada tahun 2005, Cosmos menjadi pelopor kipas angin di Indonesia yang bersertifikat Standar Nasional Indonesia (SNI).
        </p>
        <p className="text-lg">
          Cosmos terus berinovasi menghadirkan produk elektronik rumah tangga yang berkualitas dan mempermudah pekerjaan rumah tangga, seperti Rice Cooker Cosmos HARMOND yang ANTI GORES, tidak terkelupas, & lebih sehat; Blender Cosmos BLENZ yang bisa ngeblenz sendiri dan bisa BERHENTI SENDIRI; juga Kipas Angin Cosmos ONY Series yang dilengkapi Pengusir Nyamuk Elektrik.
        </p>
        <p className="text-lg">
          Waktu terus berjalan, Cosmos tidak pernah berhenti menghadirkan produk inovasi, karena Cosmos percaya kepuasan pelanggan merupakan salah satu kunci utama eksistensi Cosmos berpuluh tahun hingga saat ini. Suatu kebanggan bagi Cosmos merek lokal yang dapat bersaing dengan berbagai macam merek global yang masuk ke pasar Indonesia.
        </p>
      </motion.div>
    </div>
  );
};

export default History;
