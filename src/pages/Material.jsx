import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { sounds } from '../data/sounds'
import BgHome from '../assets/images/background/bg-home.png'

import CPU from '../assets/puzzle/hardware/CPU.png'
import Headset from '../assets/puzzle/hardware/Headset.png'
import Keyboard from '../assets/puzzle/hardware/keyboard.png'
import Microphone from '../assets/puzzle/hardware/Microphone.png'
import Modem from '../assets/puzzle/hardware/Modem.png'
import Monitor from '../assets/puzzle/hardware/Monitor.png'
import Mouse from '../assets/puzzle/hardware/mouse.png'
import Printer from '../assets/puzzle/hardware/Printer.png'
import Proyektor from '../assets/puzzle/hardware/Proyektor.png'
import Speaker from '../assets/puzzle/hardware/Speaker.png'

import Android from '../assets/puzzle/software/Android.png'
import Chrome from '../assets/puzzle/software/Chrome.png'
import Coreldraw from '../assets/puzzle/software/Coreldraw.png'
import Excel from '../assets/puzzle/software/Excell.png'
import Linux from '../assets/puzzle/software/Linux.png'
import Photoshop from '../assets/puzzle/software/Photoshop.png'
import Powerpoint from '../assets/puzzle/software/Powerpoint.png'
import Windows from '../assets/puzzle/software/Windows.png'

import Brainware from '../assets/puzzle/brainware/brainware.png'
import Administrator from '../assets/puzzle/brainware/administrator.png'
import DataAnalyst from '../assets/puzzle/brainware/dataanalyst.png'
import Operator from '../assets/puzzle/brainware/operator.png'
import Programmer from '../assets/puzzle/brainware/programmer.png'
import Teknisi from '../assets/puzzle/brainware/teknisi.png'

const tabs = ['Sistem Komputer', 'Hardware', 'Software', 'Brainware']

// ── Hardware ──────────────────────────────────────────────────────────────────
const hardwareList = [
  {
    img: CPU, nama: 'CPU (Processor)', kategori: 'Pemrosesan',
    badge: 'PROSES', badgeColor: '#818CF8',
    desc: 'CPU (Central Processing Unit) adalah otak komputer yang memproses semua instruksi dan data. Terdiri dari tiga bagian utama:',
    detail: [
      { label: 'ALU (Arithmetic Logic Unit)', val: 'Melakukan operasi matematika (penjumlahan, pengurangan) dan operasi logika (perbandingan data).' },
      { label: 'CU (Control Unit)', val: 'Mengatur dan mengoordinasikan aliran instruksi dalam komputer — memastikan setiap instruksi diproses dengan urutan yang benar.' },
      { label: 'Register', val: 'Memori kecil berkapasitas terbatas yang menyimpan data sementara selama proses berlangsung.' },
      { label: 'Kecepatan (Clock Speed)', val: 'Diukur dalam GHz — menunjukkan seberapa banyak instruksi yang dapat diproses CPU dalam satu detik. Semakin tinggi, semakin cepat pemrosesan data.' },
    ]
  },
  {
    img: Monitor, nama: 'Monitor', kategori: 'Output',
    badge: 'OUTPUT', badgeColor: '#34D399',
    desc: 'Monitor adalah perangkat output yang menampilkan hasil pemrosesan data dalam bentuk visual. Teknologi monitor modern meliputi LCD, LED, dan OLED.',
    detail: [
      { label: 'Fungsi', val: 'Menampilkan teks, gambar, video, dan antarmuka grafis dari komputer.' },
      { label: 'Jenis', val: 'LCD (Liquid Crystal Display), LED (Light Emitting Diode), OLED (Organic LED).' },
      { label: 'Catatan', val: 'Monitor tidak menyimpan data — ia hanya menampilkan apa yang dikirim oleh CPU.' },
      { label: 'Resolusi', val: 'Menentukan ketajaman gambar, contohnya HD (1280x720), Full HD (1920x1080), hingga 4K (3840x2160).' },
    ]
  },
  {
    img: Keyboard, nama: 'Keyboard', kategori: 'Input',
    badge: 'INPUT', badgeColor: '#FBBF24',
    desc: 'Keyboard adalah perangkat input utama untuk memasukkan data berupa teks, angka, simbol, dan perintah ke dalam komputer.',
    detail: [
      { label: 'Fungsi', val: 'Memasukkan teks, angka, perintah, dan shortcut ke komputer.' },
      { label: 'Standar', val: 'Keyboard QWERTY standar memiliki 104 tombol, termasuk tombol fungsi (F1–F12), numpad, dan tombol navigasi.' },
      { label: 'Jenis', val: 'Membrane, mechanical, scissor-switch — masing-masing memiliki karakteristik ketukan berbeda.' },
      { label: 'Koneksi', val: 'Terhubung ke komputer melalui kabel USB, atau secara nirkabel via Bluetooth dan receiver wireless.' },
    ]
  },
  {
    img: Mouse, nama: 'Mouse', kategori: 'Input',
    badge: 'INPUT', badgeColor: '#FBBF24',
    desc: 'Mouse adalah perangkat input untuk menggerakkan kursor di layar dan memberikan perintah dengan cara diklik.',
    detail: [
      { label: 'Fungsi', val: 'Menggerakkan kursor, mengklik, double-click, dan drag-and-drop pada antarmuka grafis.' },
      { label: 'Teknologi', val: 'Mouse modern menggunakan sensor optik atau laser untuk mendeteksi gerakan.' },
      { label: 'Tombol', val: 'Umumnya terdiri dari tombol kiri (klik utama), tombol kanan (menu konteks), dan scroll wheel.' },
      { label: 'DPI (Dots Per Inch)', val: 'Mengukur sensitivitas gerakan mouse — semakin tinggi DPI, semakin cepat kursor bergerak di layar untuk jarak gerak yang sama.' },
    ]
  },
  {
    img: Printer, nama: 'Printer', kategori: 'Output',
    badge: 'OUTPUT', badgeColor: '#34D399',
    desc: 'Printer adalah perangkat output yang mencetak data digital menjadi dokumen fisik di atas kertas atau media lainnya.',
    detail: [
      { label: 'Fungsi', val: 'Mencetak teks, gambar, atau grafik dari komputer menjadi dokumen fisik.' },
      { label: 'Jenis Inkjet', val: 'Menyemprotkan tinta cair ke kertas — cocok untuk foto berwarna berkualitas tinggi.' },
      { label: 'Jenis Laser', val: 'Menggunakan toner bubuk dan panas — lebih cepat dan ekonomis untuk dokumen teks.' },
      { label: 'Satuan Kecepatan', val: 'Diukur dalam PPM (pages per minute) — menunjukkan jumlah halaman yang bisa dicetak dalam satu menit.' },
    ]
  },
  {
    img: Speaker, nama: 'Speaker', kategori: 'Output',
    badge: 'OUTPUT', badgeColor: '#34D399',
    desc: 'Speaker adalah perangkat output audio yang mengubah sinyal elektrik dari komputer menjadi gelombang suara yang dapat didengar.',
    detail: [
      { label: 'Fungsi', val: 'Menghasilkan suara dari sinyal digital yang diproses kartu suara komputer.' },
      { label: 'Cara kerja', val: 'Amplifier memperkuat sinyal listrik, lalu menggetarkan membran/cone untuk menghasilkan gelombang suara.' },
      { label: 'Penggunaan', val: 'Mendengarkan musik, audio video, efek suara game, dan notifikasi sistem.' },
      { label: 'Jenis', val: 'Speaker built-in (bawaan monitor/laptop), speaker eksternal 2.0, dan sistem 2.1/5.1 dengan subwoofer.' },
    ]
  },
  {
    img: Headset, nama: 'Headset', kategori: 'Input + Output',
    badge: 'INPUT/OUTPUT', badgeColor: '#a78bfa',
    desc: 'Headset adalah gabungan headphone (output audio) dan mikrofon (input audio) dalam satu perangkat — untuk komunikasi audio dua arah.',
    detail: [
      { label: 'Headphone (Output)', val: 'Bagian earphone menghasilkan suara langsung ke telinga pengguna.' },
      { label: 'Mikrofon (Input)', val: 'Bagian mic menangkap suara pengguna dan mengubahnya menjadi sinyal digital.' },
      { label: 'Penggunaan', val: 'Gaming, video call, podcast, dan mendengarkan audio tanpa mengganggu sekitar.' },
      { label: 'Koneksi', val: 'Tersedia dalam versi kabel (jack 3.5mm/USB) maupun nirkabel (Bluetooth) sesuai kebutuhan mobilitas pengguna.' },
    ]
  },
  {
    img: Microphone, nama: 'Microphone', kategori: 'Input',
    badge: 'INPUT', badgeColor: '#FBBF24',
    desc: 'Mikrofon adalah perangkat input audio yang mengubah gelombang suara menjadi sinyal digital agar dapat diproses oleh komputer.',
    detail: [
      { label: 'Fungsi', val: 'Merekam suara, suara dalam video call, narasi, dan perintah suara ke komputer.' },
      { label: 'Cara kerja', val: 'Gelombang suara menggetarkan diafragma, menghasilkan sinyal listrik yang dikonversi menjadi data digital.' },
      { label: 'Jenis', val: 'Condenser (sensitif, untuk studio), dynamic (tahan banting, untuk panggung), dan USB (plug-and-play).' },
      { label: 'Kualitas rekaman', val: 'Dipengaruhi oleh sample rate dan bit depth — semakin tinggi nilainya, semakin jernih hasil rekaman suara.' },
    ]
  },
  {
    img: Modem, nama: 'Modem', kategori: 'Jaringan',
    badge: 'JARINGAN', badgeColor: '#60A5FA',
    desc: 'Modem (Modulator-Demodulator) adalah perangkat keras jaringan yang menghubungkan komputer ke internet dengan mengubah sinyal digital menjadi sinyal yang dapat ditransmisikan.',
    detail: [
      { label: 'Fungsi', val: 'Menghubungkan komputer ke internet melalui jaringan ISP (Internet Service Provider).' },
      { label: 'Cara kerja', val: 'Modulator mengubah sinyal digital → sinyal analog; Demodulator sebaliknya (menerima data dari internet).' },
      { label: 'Jenis', val: 'Modem DSL (kabel telepon), modem kabel (kabel koaksial), dan modem seluler (4G/5G).' },
      { label: 'Perbedaan dengan router', val: 'Modem menghubungkan ke internet dari ISP, sedangkan router membagikan koneksi tersebut ke banyak perangkat dalam satu jaringan.' },
    ]
  },
  {
    img: Proyektor, nama: 'Proyektor', kategori: 'Output',
    badge: 'OUTPUT', badgeColor: '#34D399',
    desc: 'Proyektor adalah perangkat output yang memproyeksikan tampilan layar komputer ke permukaan yang lebih besar seperti layar atau dinding.',
    detail: [
      { label: 'Fungsi', val: 'Menampilkan presentasi, materi pembelajaran, atau film ke layar besar agar dapat dilihat banyak orang.' },
      { label: 'Penggunaan', val: 'Presentasi bisnis, pembelajaran di kelas, bioskop rumahan, dan konferensi.' },
      { label: 'Teknologi', val: 'DLP (Digital Light Processing), LCD (Liquid Crystal Display), dan laser projector.' },
      { label: 'Lumens', val: 'Satuan kecerahan cahaya proyektor — semakin tinggi lumens, semakin jelas gambar terlihat meski di ruangan terang.' },
    ]
  },
]

// ── Software ──────────────────────────────────────────────────────────────────
const softwareList = [
  {
    img: Windows, nama: 'Windows', kategori: 'Sistem Operasi',
    badge: 'OS', badgeColor: '#818CF8',
    desc: 'Windows adalah sistem operasi buatan Microsoft yang paling banyak digunakan di dunia. Menyediakan antarmuka grafis (GUI) yang mudah digunakan dan mendukung ribuan aplikasi.',
    detail: [
      { label: 'Developer', val: 'Microsoft Corporation — pertama kali dirilis tahun 1985.' },
      { label: 'Karakteristik', val: 'Antarmuka grafis ramah pengguna, kompatibel dengan hampir semua perangkat lunak komersial.' },
      { label: 'Versi populer', val: 'Windows 10 dan Windows 11 adalah versi yang paling banyak digunakan saat ini.' },
      { label: 'Lisensi', val: 'Merupakan software berbayar (closed-source) — pengguna perlu membeli lisensi resmi untuk aktivasi penuh.' },
    ]
  },
  {
    img: Linux, nama: 'Linux', kategori: 'Sistem Operasi',
    badge: 'OS', badgeColor: '#818CF8',
    desc: 'Linux adalah sistem operasi open-source berbasis kernel Linux. Dikenal dengan keamanan, stabilitas, dan fleksibilitasnya — banyak digunakan pada server dan perangkat IoT.',
    detail: [
      { label: 'Open-source', val: 'Kode sumber terbuka — siapa pun dapat melihat, memodifikasi, dan mendistribusikan secara gratis.' },
      { label: 'Keunggulan', val: 'Sangat stabil, aman, jarang crash, dan dapat dikustomisasi sesuai kebutuhan spesifik.' },
      { label: 'Distribusi', val: 'Ubuntu, Debian, Fedora, Arch Linux — masing-masing distribusi memiliki keunggulan berbeda.' },
      { label: 'Penggunaan umum', val: 'Banyak dipakai untuk server web, superkomputer, dan perangkat tertanam (embedded system) karena efisiensinya.' },
    ]
  },
  {
    img: Android, nama: 'Android', kategori: 'Sistem Operasi Mobile',
    badge: 'OS MOBILE', badgeColor: '#34D399',
    desc: 'Android adalah sistem operasi mobile berbasis kernel Linux yang dikembangkan oleh Google. Digunakan oleh miliaran perangkat smartphone dan tablet di seluruh dunia.',
    detail: [
      { label: 'Developer', val: 'Dikembangkan oleh Google, berbasis Linux kernel.' },
      { label: 'Ekosistem', val: 'Google Play Store menyediakan jutaan aplikasi yang dapat diunduh.' },
      { label: 'Open-source', val: 'Android AOSP (Android Open Source Project) tersedia gratis untuk produsen perangkat.' },
      { label: 'Pembaruan versi', val: 'Android dirilis secara berkala dengan nama/kode versi baru yang membawa fitur, tampilan, dan peningkatan keamanan.' },
    ]
  },
  {
    img: Chrome, nama: 'Google Chrome', kategori: 'Browser Web',
    badge: 'BROWSER', badgeColor: '#60A5FA',
    desc: 'Google Chrome adalah browser web buatan Google yang menjadi browser paling populer di dunia. Dikenal dengan kecepatan, keamanan, dan dukungan ekstensi yang luas.',
    detail: [
      { label: 'Fungsi', val: 'Menjelajahi internet, mengakses website, menonton video online, dan berbagai layanan web.' },
      { label: 'Keunggulan', val: 'Cepat, mendukung ribuan ekstensi, sinkronisasi antar perangkat via akun Google.' },
      { label: 'Mesin render', val: 'Menggunakan engine Blink (fork dari WebKit) dan JavaScript engine V8.' },
      { label: 'Keamanan', val: 'Dilengkapi fitur Safe Browsing yang memperingatkan pengguna dari situs berbahaya dan phishing.' },
    ]
  },
  {
    img: Excel, nama: 'Microsoft Excel', kategori: 'Aplikasi Spreadsheet',
    badge: 'APLIKASI', badgeColor: '#FBBF24',
    desc: 'Microsoft Excel adalah aplikasi spreadsheet untuk mengolah data angka, membuat tabel, grafik, dan analisis data. Digunakan luas dalam dunia bisnis, pendidikan, dan akuntansi.',
    detail: [
      { label: 'Fungsi utama', val: 'Mengolah data angka, membuat tabel dan grafik, serta perhitungan otomatis menggunakan rumus.' },
      { label: 'Fitur rumus', val: 'Mendukung ratusan fungsi: SUM, AVERAGE, VLOOKUP, IF, dan masih banyak lagi.' },
      { label: 'Contoh penggunaan', val: 'Laporan keuangan, daftar nilai siswa, analisis penjualan, jadwal, dan anggaran.' },
      { label: 'Format file', val: 'Menggunakan ekstensi .xlsx (versi modern) atau .xls (versi lama), dan dapat diekspor ke CSV maupun PDF.' },
    ]
  },
  {
    img: Powerpoint, nama: 'Microsoft PowerPoint', kategori: 'Aplikasi Presentasi',
    badge: 'APLIKASI', badgeColor: '#FBBF24',
    desc: 'Microsoft PowerPoint adalah aplikasi untuk membuat slide presentasi yang menarik dengan teks, gambar, animasi, grafik, dan multimedia.',
    detail: [
      { label: 'Fungsi', val: 'Membuat slide show presentasi untuk bisnis, pendidikan, dan konferensi.' },
      { label: 'Fitur', val: 'Template siap pakai, animasi slide, transisi, penyisipan video dan audio.' },
      { label: 'Penggunaan', val: 'Presentasi kelas, proposal bisnis, laporan hasil penelitian, dan pitch deck.' },
      { label: 'Mode presentasi', val: 'Dilengkapi Presenter View yang menampilkan catatan pembicara secara privat sambil audiens hanya melihat slide.' },
    ]
  },
  {
    img: Photoshop, nama: 'Adobe Photoshop', kategori: 'Aplikasi Pengolah Gambar',
    badge: 'DESAIN', badgeColor: '#F87171',
    desc: 'Adobe Photoshop adalah aplikasi pengolah gambar berbasis bitmap standar industri, digunakan oleh fotografer dan desainer profesional di seluruh dunia.',
    detail: [
      { label: 'Berbasis', val: 'Bitmap/Raster — cocok untuk foto dan gambar dengan detail warna yang kompleks.' },
      { label: 'Fungsi', val: 'Editing foto, retouching, manipulasi gambar, kompositing, dan desain grafis.' },
      { label: 'Perbedaan dengan CorelDRAW', val: 'Photoshop untuk foto/bitmap; CorelDRAW untuk desain vektor (logo, ilustrasi).' },
      { label: 'Fitur unggulan', val: 'Layer system dan mask memungkinkan editing non-destruktif, sehingga gambar asli tetap aman selama proses edit.' },
    ]
  },
  {
    img: Coreldraw, nama: 'CorelDRAW', kategori: 'Aplikasi Desain Vektor',
    badge: 'DESAIN', badgeColor: '#F87171',
    desc: 'CorelDRAW adalah aplikasi desain grafis berbasis vektor. Digunakan untuk membuat logo, ilustrasi, brosur, banner, dan berbagai materi desain yang dapat diperbesar tanpa kehilangan kualitas.',
    detail: [
      { label: 'Berbasis', val: 'Vektor — gambar tidak pecah saat diperbesar, cocok untuk logo dan desain cetak.' },
      { label: 'Fungsi', val: 'Membuat logo, brosur, poster, desain kemasan, dan ilustrasi vektor.' },
      { label: 'Keunggulan', val: 'Hasil desain dapat dicetak dalam ukuran berapa pun tanpa kehilangan kualitas (resolusi independen).' },
      { label: 'Format file', val: 'Menyimpan dalam format .cdr, dan dapat diekspor ke format umum seperti .ai, .eps, .svg, dan .png.' },
    ]
  },
]

// ── Brainware ─────────────────────────────────────────────────────────────────
const brainwareList = [
  {
    img: Brainware, nama: 'Siswa', kategori: 'Pelajar',
    badge: 'PELAJAR', badgeColor: '#818CF8',
    desc: 'Pelajar yang mengoperasikan komputer juga termasuk kategori brainware. Mereka adalah pengguna yang memanfaatkan sistem komputer untuk keperluan belajar dan mengerjakan tugas.',
    detail: [
      { label: 'Peran', val: 'Menggunakan komputer untuk belajar, mengerjakan tugas, dan meningkatkan kemampuan digital.' },
      { label: 'Contoh kegiatan', val: 'Mengetik makalah, membuat presentasi, browsing referensi, dan mengikuti ujian online.' },
      { label: 'Perkembangan', val: 'Siswa yang terampil menggunakan komputer memiliki bekal penting di era digital.' },
      { label: 'Literasi digital', val: 'Kemampuan memilah informasi yang valid dan menggunakan teknologi secara bertanggung jawab menjadi bekal penting bagi siswa.' },
    ]
  },
  {
    img: Programmer, nama: 'Programmer', kategori: 'Pengembang',
    badge: 'DEVELOP', badgeColor: '#818CF8',
    desc: 'Programmer adalah orang yang membuat dan mengembangkan program atau aplikasi komputer menggunakan bahasa pemrograman.',
    detail: [
      { label: 'Tugas utama', val: 'Menulis kode program menggunakan bahasa seperti Python, Java, JavaScript, C++, atau PHP.' },
      { label: 'Tanggung jawab', val: 'Mengimplementasikan fitur, memperbaiki bug (error), dan menguji program yang dibuat.' },
      { label: 'Contoh pekerjaan', val: 'Membuat aplikasi mobile, website, game, atau sistem informasi perusahaan.' },
      { label: 'Spesialisasi', val: 'Terbagi menjadi front-end (tampilan), back-end (server & database), dan full-stack (menguasai keduanya).' },
    ]
  },
  {
    img: DataAnalyst, nama: 'System Analyst', kategori: 'Analis Sistem',
    badge: 'ANALIS', badgeColor: '#34D399',
    desc: 'System Analyst adalah orang yang menganalisis kebutuhan sistem dan merancang solusi teknologi informasi yang tepat sesuai kebutuhan organisasi.',
    detail: [
      { label: 'Tugas utama', val: 'Menganalisis kebutuhan pengguna dan merancang spesifikasi sistem sebelum programmer mengkode.' },
      { label: 'Perbedaan dengan programmer', val: 'Analyst merancang solusi (WHAT & HOW), programmer mengimplementasikannya (DO IT).' },
      { label: 'Skill', val: 'Analisis bisnis, pemodelan sistem (UML/flowchart), komunikasi dengan stakeholder.' },
      { label: 'Posisi dalam tim', val: 'Menjadi jembatan komunikasi antara pengguna/klien dengan tim developer agar solusi yang dibangun sesuai kebutuhan nyata.' },
    ]
  },
  {
    img: Operator, nama: 'Operator', kategori: 'Pengguna Operasional',
    badge: 'OPERASIONAL', badgeColor: '#FBBF24',
    desc: 'Operator adalah orang yang mengoperasikan komputer sehari-hari untuk menjalankan program sesuai prosedur yang telah ditetapkan.',
    detail: [
      { label: 'Tugas utama', val: 'Menjalankan program, memasukkan data, dan mengoperasikan sistem sesuai prosedur.' },
      { label: 'Contoh', val: 'Kasir yang mengoperasikan mesin kasir, staf administrasi yang mengelola data di komputer.' },
      { label: 'Tanggung jawab', val: 'Memastikan pekerjaan sehari-hari berjalan lancar menggunakan sistem komputer.' },
      { label: 'Skill dasar', val: 'Cukup menguasai penggunaan aplikasi standar (misalnya entri data atau kasir), tanpa perlu kemampuan pemrograman.' },
    ]
  },
  {
    img: Administrator, nama: 'Administrator', kategori: 'Pengelola Sistem',
    badge: 'ADMIN', badgeColor: '#60A5FA',
    desc: 'Administrator adalah orang yang bertanggung jawab mengelola, memelihara, dan mengamankan sistem komputer atau jaringan dalam suatu organisasi.',
    detail: [
      { label: 'Tugas utama', val: 'Mengelola akun pengguna, hak akses, keamanan sistem, dan backup data.' },
      { label: 'Network Admin', val: 'Mengatur konfigurasi jaringan, router, firewall, dan memastikan konektivitas internet.' },
      { label: 'Tanggung jawab', val: 'Memastikan sistem berjalan 24/7, aman dari ancaman, dan data terlindungi.' },
      { label: 'Database Admin', val: 'Salah satu spesialisasi administrator yang fokus mengelola database, memastikan data tersimpan rapi, aman, dan mudah diakses.' },
    ]
  },
  {
    img: Teknisi, nama: 'Teknisi', kategori: 'Pemelihara Hardware',
    badge: 'TEKNIS', badgeColor: '#F87171',
    desc: 'Teknisi adalah orang yang bertugas merawat, memperbaiki, dan memastikan perangkat keras komputer berfungsi dengan baik.',
    detail: [
      { label: 'Tugas utama', val: 'Merawat, memperbaiki, dan mengganti komponen hardware yang rusak.' },
      { label: 'Contoh pekerjaan', val: 'Membersihkan komputer, mengganti RAM/harddisk, memperbaiki monitor atau keyboard.' },
      { label: 'Perbedaan dengan admin', val: 'Teknisi fokus ke hardware fisik; administrator fokus ke pengelolaan sistem dan jaringan.' },
      { label: 'Skill pendukung', val: 'Memahami troubleshooting dasar, instalasi driver, dan perakitan komputer (assembling PC) menjadi kemampuan penting seorang teknisi.' },
    ]
  },
]

// ── Materi Sistem Komputer ────────────────────────────────────────────────────
// Disederhanakan: hanya menyebutkan bahwa sistem komputer terdiri dari
// Hardware, Software, dan Brainware — penjelasan detail masing-masing
// sudah dipindahkan ke tab-nya sendiri (Hardware / Software / Brainware).
const komponenUtama = [
  {
    title: 'Hardware', color: '#60A5FA', bg: '#1e3a5f',
    desc: 'Komponen fisik komputer yang dapat dilihat dan disentuh secara langsung.',
  },
  {
    title: 'Software', color: '#34D399', bg: '#064e3b',
    desc: 'Perangkat lunak yang memberikan instruksi kepada hardware untuk menjalankan tugas.',
  },
  {
    title: 'Brainware', color: '#FBBF24', bg: '#451a03',
    desc: 'Manusia yang mengoperasikan, mengembangkan, dan mengelola sistem komputer.',
  },
]

const prosesKerja = [
  { step: '01', label: 'INPUT', desc: 'Data dimasukkan melalui perangkat input seperti keyboard atau mouse', color: '#818CF8' },
  { step: '02', label: 'PROSES', desc: 'CPU memproses data sesuai instruksi dari software (program)', color: '#FBBF24' },
  { step: '03', label: 'OUTPUT', desc: 'Hasil ditampilkan melalui perangkat output seperti monitor atau printer', color: '#34D399' },
]

// ── Modal Detail ──────────────────────────────────────────────────────────────
const DetailModal = ({ item, visible, onClose }) => {
  const [imgFull, setImgFull] = useState(false)

  if (!item) return null

  return (
    <>
      {/* Modal utama */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-6"
        style={{
          background: visible ? 'rgba(0,0,0,0.85)' : 'transparent',
          backdropFilter: visible ? 'blur(12px)' : 'none',
          transition: 'all 0.3s'
        }}
        onClick={onClose}
      >
        <div
          className={`relative rounded-3xl p-0 w-full max-w-4xl overflow-hidden ${visible ? 'modal-in' : 'modal-out'}`}
          style={{
            background: 'linear-gradient(135deg,#13113A,#2D2A6E)',
            border: '1px solid #a78bfa55',
            boxShadow: '0 0 80px #7c3aed55',
            maxHeight: '85vh'
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Top accent bar */}
          <div className="h-0.5 w-full flex-shrink-0"
            style={{ background: `linear-gradient(90deg,#7c3aed,${item.badgeColor || '#a78bfa'},#7c3aed)` }} />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all z-10 text-lg glow-btn"
            style={{ background: '#1E1B4B88' }}
          >
            ✕
          </button>

          <div className="flex flex-col md:flex-row" style={{ maxHeight: 'calc(85vh - 2px)' }}>

            {/* ── Kolom kiri: gambar + identitas ── */}
            <div
              className="flex flex-col items-center text-center gap-3 p-7 md:w-[280px] flex-shrink-0"
              style={{ borderRight: '1px solid #7c3aed22' }}
            >
              <div
                onClick={() => setImgFull(true)}
                className="w-36 h-36 rounded-2xl flex items-center justify-center flex-shrink-0 p-4 cursor-zoom-in transition-all hover:scale-105"
                style={{
                  background: '#1E1B4B',
                  border: '1px solid #7c3aed33',
                  boxShadow: '0 0 20px #7c3aed33'
                }}
              >
                <img
                  src={item.img}
                  className="w-full h-full object-contain"
                  style={{ filter: 'drop-shadow(0 0 10px #a78bfaaa)' }}
                />
              </div>

              <span
                className="text-base font-black px-3 py-1 rounded-full"
                style={{
                  background: `${item.badgeColor || '#a78bfa'}20`,
                  color: item.badgeColor || '#a78bfa',
                  fontFamily: 'Orbitron'
                }}
              >
                {item.badge}
              </span>

              <h2 className="text-white font-black text-2xl leading-tight" style={{ fontFamily: 'Orbitron' }}>{item.nama}</h2>
              <span className="text-base text-gray-300" style={{ fontFamily: 'Rajdhani' }}>{item.kategori}</span>

              <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: 'Rajdhani' }}>
                Klik gambar untuk memperbesar
              </p>
            </div>

            {/* ── Kolom kanan: deskripsi + detail (scrollable) ── */}
            <div className="flex-1 p-7 overflow-y-auto scrollbar-hide">
              {/* Deskripsi */}
              <p
                className="text-gray-100 text-lg leading-relaxed mb-5 p-4 rounded-2xl"
                style={{ background: '#1E1B4B66', border: '1px solid #7c3aed22' }}
              >
                {item.desc}
              </p>

              {/* Detail list */}
              <div className="flex flex-col gap-2">
                {item.detail?.map((d, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3 flex gap-3"
                    style={{ background: '#13113A', border: '1px solid #7c3aed1a' }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{
                        background: item.badgeColor || '#a78bfa',
                        boxShadow: `0 0 6px ${item.badgeColor || '#a78bfa'}`
                      }}
                    />
                    <div>
                      <p
                        className="text-base font-black mb-1"
                        style={{ color: item.badgeColor || '#a78bfa', fontFamily: 'Rajdhani' }}
                      >
                        {d.label}
                      </p>
                      <p className="text-gray-100 text-base leading-relaxed">{d.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Fullscreen image modal */}
      {imgFull && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{
            background: 'rgba(0,0,0,0.97)',
            backdropFilter: 'blur(20px)',
            animation: 'fadeIn .2s ease both'
          }}
          onClick={() => setImgFull(false)}
        >
          <div
            className="relative flex flex-col items-center gap-5 px-8 max-w-lg w-full"
            style={{ animation: 'zoomIn .25s cubic-bezier(.23,1,.32,1) both' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setImgFull(false)}
              className="self-end text-base font-black tracking-widest px-4 py-1.5 rounded-xl transition-all hover:bg-white/10 glow-btn"
              style={{ color: '#a78bfa', border: '1px solid #7c3aed44', fontFamily: 'Rajdhani' }}
            >
              TUTUP ✕
            </button>

            <div
              className="w-full rounded-3xl flex items-center justify-center p-10"
              style={{
                background: 'linear-gradient(135deg,#13113A,#2D2A6E)',
                border: '1px solid #a78bfa44',
                boxShadow: '0 0 80px #7c3aed66'
              }}
            >
              <img
                src={item.img}
                className="object-contain"
                style={{
                  maxHeight: '60vh',
                  maxWidth: '100%',
                  filter: 'drop-shadow(0 0 30px #a78bfacc)'
                }}
              />
            </div>

            <p
              className="text-white font-black text-xl uppercase tracking-widest text-center"
              style={{ fontFamily: 'Orbitron', textShadow: '0 0 20px #a78bfa' }}
            >
              {item.nama}
            </p>

            <p className="text-gray-400 text-base" style={{ fontFamily: 'Rajdhani' }}>
              Klik di mana saja untuk menutup
            </p>
          </div>
        </div>
      )}
    </>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
const Material = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [displayTab, setDisplayTab] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (!user) navigate('/auth')
  }, [navigate])

  const handleTab = (i) => {
    if (i === activeTab || animating) return
    sounds.click.play()
    setAnimating(true)
    setTimeout(() => {
      setDisplayTab(i)
      setActiveTab(i)
      setAnimating(false)
    }, 350)
  }

  const handleBack = () => {
    sounds.click.play()
    navigate('/')
  }

  const openModal = (item) => {
    sounds.click.play()
    setSelectedItem(item)
    setTimeout(() => setModalVisible(true), 10)
  }

  const closeModal = () => {
    setModalVisible(false)
    setTimeout(() => setSelectedItem(null), 300)
  }

  const getList = () => {
    if (displayTab === 1) return hardwareList
    if (displayTab === 2) return softwareList
    if (displayTab === 3) return brainwareList
    return []
  }

  return (
    <>
      <style>{`

        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes zoomIn  { from{opacity:0;transform:scale(0.7)} to{opacity:1;transform:scale(1)} }

        @keyframes foldIn {
          0%   { opacity:0; transform:perspective(1000px) rotateX(-60deg) translateY(-20px); }
          60%  { transform:perspective(1000px) rotateX(5deg) translateY(2px); opacity:1; }
          100% { transform:perspective(1000px) rotateX(0deg) translateY(0); opacity:1; }
        }
        @keyframes foldOut {
          0%   { opacity:1; transform:perspective(1000px) rotateX(0deg); }
          100% { opacity:0; transform:perspective(1000px) rotateX(60deg) translateY(20px); }
        }
        @keyframes modalIn {
          0%   { opacity:0; transform:scale(0.85) rotateY(-15deg); }
          70%  { transform:scale(1.02) rotateY(2deg); opacity:1; }
          100% { transform:scale(1) rotateY(0deg); opacity:1; }
        }
        @keyframes modalOut {
          0%   { opacity:1; transform:scale(1); }
          100% { opacity:0; transform:scale(0.85) rotateY(15deg); }
        }
        @keyframes glitch {
          0%,88%,100% { text-shadow:2px 0 #a78bfa,-2px 0 #7c3aed; }
          90% { text-shadow:-3px 0 #a78bfa,3px 0 #7c3aed; letter-spacing:0.22em; }
          93% { text-shadow:3px 0 #a78bfa,-3px 0 #7c3aed; letter-spacing:0.12em; }
        }
        @keyframes cardPop {
          from { opacity:0; transform:scale(0.9) translateY(10px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes cardFloat {
          0%,100% { transform:translateY(0px); }
          50%     { transform:translateY(-5px); }
        }
        @keyframes stepIn {
          from { opacity:0; transform:translateX(-20px); }
          to   { opacity:1; transform:translateX(0); }
        }

        .fold-in   { animation:foldIn  0.4s cubic-bezier(0.23,1,0.32,1) both; }
        .fold-out  { animation:foldOut 0.3s ease-in both; }
        .modal-in  { animation:modalIn  0.35s cubic-bezier(0.23,1,0.32,1) both; }
        .modal-out { animation:modalOut 0.25s ease-in both; }

        .title-glitch { animation:glitch 6s infinite; font-family:'Orbitron',sans-serif; }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid rgba(180, 0, 255, 0.4);
          color: #c084fc;
          padding: 8px 16px;
          cursor: pointer;
          font-family:'Orbitron',sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.2s;
        }
        .back-btn { transition:all 0.3s; position:relative; overflow:hidden; }
        .back-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,#a78bfa22,transparent); transform:translateX(-100%); transition:transform 0.4s; }
        .back-btn:hover::after { transform:translateX(100%); }
        .back-btn:hover { border-color:#a78bfa !important; box-shadow:0 0 16px #7c3aed66; transform:translateX(-3px); }

        .tab-pill { transition:all 0.3s; font-family:'Orbitron',sans-serif; }
        .tab-pill:not(.active):hover { background:#2D2A6E66 !important; color:#e9d5ff !important; }

        .item-card { cursor:pointer; transition:all 0.25s cubic-bezier(0.23,1,0.32,1); }
        .item-card:hover { transform:translateY(-5px) scale(1.04); box-shadow:0 8px 32px #7c3aed55; border-color:#a78bfa66 !important; }
        .item-card:active { transform:scale(0.96); }

        .card-pop   { animation:cardPop   0.35s ease both; }
        .card-float { animation:cardFloat 3s ease-in-out infinite; }
        .step-in    { animation:stepIn    0.4s ease both; }

        .sub-card { transition:all 0.2s; }
        .sub-card:hover { border-color:#7c3aed55 !important; background:#1E1B4Bcc !important; }

        .scrollbar-hide::-webkit-scrollbar { display:none; }
        .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }

        /* ══ Glow generik untuk semua tombol (close, kembali, dll) ══ */
        .glow-btn {
          transition: filter .2s ease, transform .2s ease, box-shadow .2s ease;
        }
        .glow-btn:hover {
          filter: brightness(1.25) drop-shadow(0 0 8px #a78bfaaa);
          transform: scale(1.08);
        }
        .glow-btn:active {
          transform: scale(0.94);
          filter: brightness(0.95);
        }
      `}</style>

      <div
        className="h-screen flex flex-col font-body relative overflow-hidden"
        style={{ backgroundImage:`url(${BgHome})`, backgroundSize:'cover', backgroundPosition:'center' }}
      >
        <div className="absolute inset-0 bg-[#0f0d2e]/85" />

        <div className="relative z-10 flex flex-col h-full">

          {/* ── Header ── */}
          <div className="flex items-center justify-between px-6 pt-5 pb-2 flex-shrink-0">
            <button
              onClick={handleBack}
              className="back-btn px-4 py-2 rounded-xl text-white text-base font-bold flex items-center gap-2"
              style={{ background:'#1E1B4B', border:'1px solid #7c3aed55' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>KEMBALI</span>
            </button>

            <div className="text-center">
              <h1 className="title-glitch text-3xl font-black text-white uppercase tracking-widest">MATERI</h1>
              <p className="text-primary-light text-base tracking-widest mt-0.5" style={{ fontFamily:'Rajdhani' }}>SISTEM KOMPUTER</p>
            </div>

            <div className="w-28" />
          </div>

          {/* ── Tabs ── */}
          <div className="flex justify-center px-4 mb-3 flex-shrink-0">
            <div className="flex gap-1 p-1 rounded-2xl" style={{ background:'#13113A', border:'1px solid #7c3aed33' }}>
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => handleTab(i)}
                  className={`tab-pill px-4 py-2 rounded-xl text-base font-bold uppercase tracking-wider ${activeTab === i ? 'active' : ''}`}
                  style={activeTab === i
                    ? { background:'linear-gradient(135deg,#7c3aed,#5b21b6)', color:'white', boxShadow:'0 0 16px #7c3aed66' }
                    : { background:'transparent', color:'#c4b5fdb3' }
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* ── Content ── */}
          <div
            className={`flex-1 overflow-hidden px-5 pb-4 ${animating ? 'fold-out' : 'fold-in'}`}
            style={{ transformOrigin:'top center' }}
          >

            {/* TAB: SISTEM KOMPUTER */}
            {displayTab === 0 && (
              <div className="h-full overflow-y-auto scrollbar-hide">
                <div className="max-w-5xl mx-auto flex flex-col gap-4 pb-2">

                  {/* Banner pengantar */}
                  <div className="rounded-2xl px-6 py-4"
                    style={{ background:'linear-gradient(135deg,#2D2A6E88,#13113Acc)', border:'1px solid #7c3aed55' }}>
                    <h2 className="text-white font-black text-xl uppercase tracking-wider mb-2"
                      style={{ fontFamily:'Orbitron', textShadow:'0 0 16px #a78bfa' }}>
                      Sistem Komputer
                    </h2>
                    <p className="text-gray-100 text-lg leading-relaxed">
                      Sistem komputer adalah kumpulan perangkat yang bekerja bersama-sama untuk menerima, memproses, menyimpan, dan menghasilkan informasi.
                      Terdiri dari <span className="text-blue-300 font-bold">tiga komponen utama</span> yang saling berkaitan dan tidak dapat dipisahkan: Hardware, Software, dan Brainware.
                    </p>
                  </div>

                  {/* Proses kerja */}
                  <div className="rounded-2xl px-5 py-4"
                    style={{ background:'#13113A', border:'1px solid #7c3aed22' }}>
                    <p className="text-base uppercase tracking-widest mb-3 font-black"
                      style={{ fontFamily:'Orbitron', color:'#a78bfa' }}>
                      Proses Kerja Komputer
                    </p>
                    <div className="flex items-center gap-2">
                      {prosesKerja.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 flex-1">
                          <div
                            className="flex-1 rounded-xl p-3 text-center step-in"
                            style={{ background:`${p.color}11`, border:`1px solid ${p.color}33`, animationDelay:`${i * 0.1}s` }}
                          >
                            <p className="font-black text-base uppercase tracking-wider mb-1"
                              style={{ color:p.color, fontFamily:'Orbitron' }}>
                              {p.label}
                            </p>
                            <p className="text-gray-200 text-base leading-relaxed">{p.desc}</p>
                          </div>
                          {i < prosesKerja.length - 1 && (
                            <div className="flex flex-col items-center flex-shrink-0">
                              <p className="text-base" style={{ color:'#7c3aed88' }}>→</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tiga komponen — hanya sekilas, detail ada di masing-masing tab */}
                  <div className="grid grid-cols-3 gap-4">
                    {komponenUtama.map((c, ci) => (
                      <div
                        key={ci}
                        className="card-float rounded-2xl p-5 flex flex-col gap-2"
                        style={{ background:`linear-gradient(135deg,${c.bg}88,#13113A)`, border:`1px solid ${c.color}33`, animationDelay:`${ci * 0.4}s` }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-0.5 rounded-full" style={{ background:c.color, boxShadow:`0 0 8px ${c.color}` }} />
                          <h3 className="font-black text-base uppercase" style={{ color:c.color, fontFamily:'Orbitron' }}>{c.title}</h3>
                        </div>
                        <p className="text-gray-100 text-base leading-relaxed">{c.desc}</p>
                        <p className="text-gray-300 text-base mt-1" style={{ fontFamily:'Rajdhani' }}>
                          Lihat detail lengkap di tab <span className="font-bold" style={{ color:c.color }}>{c.title}</span> →
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            )}

            {/* TAB: HARDWARE / SOFTWARE / BRAINWARE */}
            {displayTab > 0 && (
              <div className="h-full flex flex-col gap-3 max-w-5xl mx-auto">
                <div className="rounded-2xl px-5 py-3 flex-shrink-0"
                  style={{ background:'#13113A', border:'1px solid #7c3aed33' }}>
                  <p className="text-gray-100 text-lg leading-relaxed">
                    {displayTab === 1 && 'Hardware adalah komponen fisik sistem komputer yang dapat dilihat dan disentuh secara langsung. Terbagi menjadi perangkat input, output, pemrosesan, dan jaringan. Klik pada perangkat untuk melihat penjelasan lengkap.'}
                    {displayTab === 2 && 'Software adalah perangkat lunak berupa kumpulan instruksi yang memberitahu hardware apa yang harus dilakukan. Terbagi menjadi sistem operasi, aplikasi, dan utility. Klik untuk melihat detail.'}
                    {displayTab === 3 && 'Brainware adalah manusia yang mengoperasikan, mengembangkan, dan mengelola sistem komputer. Tanpa brainware, hardware dan software tidak dapat berfungsi dengan optimal. Klik untuk melihat peran masing-masing.'}
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide">
                  <div className="flex flex-wrap justify-center gap-3 pb-2">
                    {getList().map((item, i) => (
                      <div
                        key={i}
                        onClick={() => openModal(item)}
                        className="item-card card-pop rounded-2xl p-3 flex flex-col items-center text-center gap-2"
                        style={{
                          background:'linear-gradient(135deg,#13113A,#1E1B4B)',
                          border:'1px solid #7c3aed44',
                          width:'calc(20% - 12px)',
                          minWidth:'120px',
                          animationDelay:`${i * 0.04}s`
                        }}
                      >
                        <div className="w-full aspect-square flex items-center justify-center p-2">
                          <img
                            src={item.img}
                            className="w-full h-full object-contain"
                            style={{ filter:'drop-shadow(0 0 6px #7c3aed55)' }}
                          />
                        </div>
                        <p className="text-white font-bold text-base leading-tight" style={{ fontFamily:'Rajdhani' }}>
                          {item.nama}
                        </p>
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            background:`${item.badgeColor || '#a78bfa'}15`,
                            color: item.badgeColor || '#a78bfa',
                            fontFamily:'Orbitron',
                            fontSize:'12px',
                            fontWeight:'900'
                          }}
                        >
                          {item.badge}
                        </span>
                        <div className="w-8 h-0.5 rounded-full"
                          style={{ background:'linear-gradient(90deg,#7c3aed,#a78bfa)' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modal */}
        <DetailModal item={selectedItem} visible={modalVisible} onClose={closeModal} />

      </div>
    </>
  )
}

export default Material