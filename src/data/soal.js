import CPU from '../assets/puzzle/hardware/CPU.png'
import Monitor from '../assets/puzzle/hardware/Monitor.png'
import Keyboard from '../assets/puzzle/hardware/keyboard.png'
import Mouse from '../assets/puzzle/hardware/mouse.png'
import Printer from '../assets/puzzle/hardware/Printer.png'
import Speaker from '../assets/puzzle/hardware/Speaker.png'
import Headset from '../assets/puzzle/hardware/Headset.png'
import Microphone from '../assets/puzzle/hardware/Microphone.png'
import Modem from '../assets/puzzle/hardware/Modem.png'
import Proyektor from '../assets/puzzle/hardware/Proyektor.png'
import Windows from '../assets/puzzle/software/Windows.png'
import Linux from '../assets/puzzle/software/Linux.png'
import Android from '../assets/puzzle/software/Android.png'
import Chrome from '../assets/puzzle/software/Chrome.png'
import Excel from '../assets/puzzle/software/Excell.png'
import Powerpoint from '../assets/puzzle/software/Powerpoint.png'
import Photoshop from '../assets/puzzle/software/Photoshop.png'
import Coreldraw from '../assets/puzzle/software/Coreldraw.png'
import Administrator from '../assets/puzzle/brainware/administrator.png'
import Brainware from '../assets/puzzle/brainware/brainware.png'
import DataAnalist from '../assets/puzzle/brainware/dataanalyst.png'
import Operator from '../assets/puzzle/brainware/operator.png'
import Programmer from '../assets/puzzle/brainware/programmer.png'
import Teknisi from '../assets/puzzle/brainware/teknisi.png'

export const soalPilihanGanda = [
  // SISTEM KOMPUTER
  { id:1, soal:'Sistem komputer terdiri dari tiga komponen utama, yaitu...', img:null, pilihan:['Hardware, Software, Jaringan','Hardware, Software, Brainware','CPU, RAM, Harddisk','Input, Proses, Output'], kunci:1 },
  { id:2, soal:'Komponen sistem komputer yang dapat dilihat dan disentuh secara fisik disebut...', img:null, pilihan:['Software','Brainware','Hardware','Firmware'], kunci:2 },
  { id:3, soal:'Perangkat lunak atau program komputer disebut...', img:null, pilihan:['Hardware','Brainware','Firmware','Software'], kunci:3 },
  { id:4, soal:'Manusia yang mengoperasikan komputer disebut...', img:null, pilihan:['Software','Hardware','Brainware','Operator'], kunci:2 },
  { id:5, soal:'Proses dasar kerja komputer secara berurutan adalah...', img:null, pilihan:['Output - Proses - Input','Input - Output - Proses','Input - Proses - Output','Proses - Input - Output'], kunci:2 },

  // HARDWARE - INPUT
  { id:6, soal:'Perangkat pada gambar berikut berfungsi sebagai...', img:Keyboard, pilihan:['Perangkat output untuk menampilkan teks','Perangkat input untuk memasukkan data teks','Perangkat penyimpanan data','Perangkat pemrosesan data'], kunci:1 },
  { id:7, soal:'Perangkat pada gambar digunakan untuk...', img:Mouse, pilihan:['Mencetak dokumen','Menghasilkan suara','Menggerakkan kursor di layar','Memasukkan suara'], kunci:2 },
  { id:8, soal:'Perangkat pada gambar berfungsi untuk...', img:Microphone, pilihan:['Menampilkan gambar','Memasukkan suara ke komputer','Mencetak foto','Menghasilkan suara'], kunci:1 },
  { id:9, soal:'Keyboard dan mouse termasuk jenis perangkat...', img:null, pilihan:['Output','Penyimpanan','Pemrosesan','Input'], kunci:3 },
  { id:10, soal:'Perangkat yang digunakan untuk memasukkan data ke komputer disebut perangkat...', img:null, pilihan:['Output','Input','Penyimpanan','Jaringan'], kunci:1 },

  // HARDWARE - OUTPUT
  { id:11, soal:'Perangkat pada gambar termasuk perangkat...', img:Monitor, pilihan:['Input','Penyimpanan','Output','Pemrosesan'], kunci:2 },
  { id:12, soal:'Perangkat pada gambar digunakan untuk...', img:Printer, pilihan:['Mencetak dokumen menjadi kertas fisik','Menyimpan data','Menampilkan gambar di layar','Memasukkan teks'], kunci:0 },
  { id:13, soal:'Perangkat pada gambar menghasilkan...', img:Speaker, pilihan:['Gambar','Teks','Suara','Dokumen cetak'], kunci:2 },
  { id:14, soal:'Perangkat pada gambar sering digunakan untuk presentasi karena...', img:Proyektor, pilihan:['Menyimpan file','Memproyeksikan tampilan ke layar besar','Memasukkan data','Mencetak dokumen besar'], kunci:1 },
  { id:15, soal:'Monitor, printer, dan speaker termasuk jenis perangkat...', img:null, pilihan:['Input','Pemrosesan','Penyimpanan','Output'], kunci:3 },

  // HARDWARE - PROSES & LAINNYA
  { id:16, soal:'Perangkat pada gambar disebut CPU yang berfungsi sebagai...', img:CPU, pilihan:['Penyimpan data permanen','Penghubung internet','Otak komputer yang memproses data','Penampil gambar'], kunci:2 },
  { id:17, soal:'Perangkat pada gambar merupakan kombinasi headphone dan mikrofon yang disebut...', img:Headset, pilihan:['Speaker','Headset','Amplifier','Mikrofon'], kunci:1 },
  { id:18, soal:'Perangkat pada gambar digunakan untuk menghubungkan komputer ke internet, yaitu...', img:Modem, pilihan:['Printer','Router','Modem','Scanner'], kunci:2 },
  { id:19, soal:'CPU singkatan dari...', img:null, pilihan:['Computer Processing Unit','Central Program Unit','Central Processing Unit','Computer Program Unit'], kunci:2 },
  { id:20, soal:'Komponen CPU yang melakukan operasi matematika dan logika adalah...', img:null, pilihan:['CU (Control Unit)','Register','Cache','ALU (Arithmetic Logic Unit)'], kunci:3 },

  // SOFTWARE - SISTEM OPERASI
  { id:21, soal:'Perangkat lunak pada gambar adalah sistem operasi bernama...', img:Windows, pilihan:['Linux','MacOS','Android','Windows'], kunci:3 },
  { id:22, soal:'Perangkat lunak pada gambar merupakan sistem operasi yang bersifat open-source, yaitu...', img:Linux, pilihan:['Windows','Linux','iOS','MacOS'], kunci:1 },
  { id:23, soal:'Perangkat lunak pada gambar adalah sistem operasi untuk perangkat mobile, yaitu...', img:Android, pilihan:['Windows','Linux','Android','iOS'], kunci:2 },
  { id:24, soal:'Sistem operasi adalah software yang berfungsi untuk...', img:null, pilihan:['Membuat presentasi','Mengedit foto','Mengelola semua sumber daya komputer','Menjelajah internet'], kunci:2 },
  { id:25, soal:'Contoh software sistem operasi adalah...', img:null, pilihan:['Microsoft Word','Adobe Photoshop','Google Chrome','Windows dan Linux'], kunci:3 },

  // SOFTWARE - APLIKASI
  { id:26, soal:'Perangkat lunak pada gambar adalah browser web bernama...', img:Chrome, pilihan:['Firefox','Opera','Safari','Google Chrome'], kunci:3 },
  { id:27, soal:'Perangkat lunak pada gambar digunakan untuk mengolah data angka, yaitu...', img:Excel, pilihan:['Microsoft Word','Microsoft Excel','Microsoft PowerPoint','Microsoft Access'], kunci:1 },
  { id:28, soal:'Perangkat lunak pada gambar digunakan untuk membuat presentasi, yaitu...', img:Powerpoint, pilihan:['Microsoft Excel','Microsoft Word','Microsoft PowerPoint','CorelDRAW'], kunci:2 },
  { id:29, soal:'Perangkat lunak pada gambar digunakan untuk mengedit gambar/foto, yaitu...', img:Photoshop, pilihan:['CorelDRAW','Adobe Photoshop','Microsoft Paint','GIMP'], kunci:1 },
  { id:30, soal:'Perangkat lunak pada gambar adalah aplikasi desain berbasis vektor, yaitu...', img:Coreldraw, pilihan:['Adobe Photoshop','GIMP','CorelDRAW','Microsoft Paint'], kunci:2 },

  // SOFTWARE - JENIS
  { id:31, soal:'Software yang dapat digunakan gratis dan kode sumbernya terbuka disebut...', img:null, pilihan:['Shareware','Freeware','Open-source','Proprietary'], kunci:2 },
  { id:32, soal:'Antivirus termasuk jenis software...', img:null, pilihan:['Sistem operasi','Aplikasi produktivitas','Utility','Bahasa pemrograman'], kunci:2 },
  { id:33, soal:'Software yang digunakan untuk menjelajahi internet disebut...', img:null, pilihan:['Spreadsheet','Browser','Word processor','Media player'], kunci:1 },
  { id:34, soal:'Microsoft Excel digunakan untuk...', img:null, pilihan:['Membuat presentasi','Mengedit foto','Mengolah data angka dan tabel','Menjelajahi internet'], kunci:2 },
  { id:35, soal:'Software dibagi menjadi dua kategori utama, yaitu...', img:null, pilihan:['Hardware dan Firmware','Input dan Output','Sistem operasi dan Aplikasi','Freeware dan Shareware'], kunci:2 },

  // BRAINWARE
  { id:36, soal:'Orang yang bertugas membuat program komputer disebut...', img:null, pilihan:['Operator','Teknisi','Programmer','Administrator'], kunci:2 },
  { id:37, soal:'Orang yang mengoperasikan komputer sehari-hari disebut...', img:null, pilihan:['Programmer','Operator','System Analyst','Teknisi'], kunci:1 },
  { id:38, soal:'Orang yang merawat dan memperbaiki perangkat keras komputer disebut...', img:null, pilihan:['Programmer','Operator','System Analyst','Teknisi'], kunci:3 },
  { id:39, soal:'Orang yang menganalisis kebutuhan sistem dan merancang solusinya disebut...', img:null, pilihan:['Operator','Teknisi','System Analyst','Programmer'], kunci:2 },
  { id:40, soal:'Tanpa brainware, sistem komputer...', img:null, pilihan:['Berjalan lebih cepat','Tidak dapat berfungsi optimal','Bekerja otomatis','Tidak berpengaruh'], kunci:1 },

  // CAMPURAN MATERI
  { id:41, soal:'Hardware yang berfungsi menampilkan hasil kerja komputer ke layar adalah...', img:null, pilihan:['Keyboard','Mouse','Monitor','Printer'], kunci:2 },
  { id:42, soal:'Hardware yang digunakan untuk memasukkan perintah dengan cara diklik adalah...', img:null, pilihan:['Keyboard','Monitor','Printer','Mouse'], kunci:3 },
  { id:43, soal:'Software yang digunakan untuk membuat slide presentasi adalah...', img:null, pilihan:['Microsoft Excel','Microsoft PowerPoint','Google Chrome','Adobe Photoshop'], kunci:1 },
  { id:44, soal:'Komponen hardware yang disebut "otak komputer" adalah...', img:null, pilihan:['RAM','Harddisk','Monitor','CPU'], kunci:3 },
  { id:45, soal:'Perangkat output yang menghasilkan dokumen cetak adalah...', img:null, pilihan:['Scanner','Monitor','Printer','Proyektor'], kunci:2 },
  { id:46, soal:'Brainware yang bertugas mengelola dan mengamankan jaringan komputer adalah...', img:null, pilihan:['Programmer','Operator','Administrator','Teknisi'], kunci:2 },
  { id:47, soal:'Headset merupakan gabungan dari dua perangkat, yaitu...', img:null, pilihan:['Keyboard dan mouse','Monitor dan speaker','Headphone dan mikrofon','Printer dan scanner'], kunci:2 },
  { id:48, soal:'Modem berfungsi untuk...', img:null, pilihan:['Menyimpan data','Mencetak dokumen','Menghubungkan komputer ke internet','Menampilkan gambar'], kunci:2 },
  { id:49, soal:'Linux dikenal sebagai sistem operasi yang bersifat...', img:null, pilihan:['Berbayar','Tertutup','Open-source dan gratis','Milik Microsoft'], kunci:2 },
  { id:50, soal:'Adobe Photoshop digunakan untuk...', img:null, pilihan:['Membuat tabel data','Membuat presentasi','Mengedit dan mengolah gambar','Menjelajahi internet'], kunci:2 },

  // TAMBAHAN
  { id:51, soal:'Perangkat input yang digunakan untuk mengetik adalah...', img:null, pilihan:['Mouse','Monitor','Keyboard','Printer'], kunci:2 },
  { id:52, soal:'CorelDRAW adalah aplikasi untuk...', img:null, pilihan:['Mengolah angka','Membuat presentasi','Desain grafis berbasis vektor','Menjelajahi internet'], kunci:2 },
  { id:53, soal:'Google Chrome adalah contoh software jenis...', img:null, pilihan:['Sistem operasi','Browser web','Pengolah kata','Antivirus'], kunci:1 },
  { id:54, soal:'Perangkat yang memproyeksikan tampilan komputer ke layar besar disebut...', img:null, pilihan:['Monitor','Printer','Scanner','Proyektor'], kunci:3 },
  { id:55, soal:'Speaker termasuk perangkat...', img:null, pilihan:['Input','Pemrosesan','Output','Penyimpanan'], kunci:2 },
  { id:56, soal:'Programmer termasuk kategori...', img:null, pilihan:['Hardware','Software','Brainware','Firmware'], kunci:2 },
  { id:57, soal:'Sistem operasi Android dikembangkan oleh...', img:null, pilihan:['Microsoft','Apple','Google','Samsung'], kunci:2 },
  { id:58, soal:'Microsoft Excel termasuk kategori software...', img:null, pilihan:['Sistem operasi','Utility','Aplikasi','Browser'], kunci:2 },
  { id:59, soal:'Perangkat keras yang menghubungkan semua komponen komputer disebut...', img:null, pilihan:['RAM','CPU','Motherboard','Harddisk'], kunci:2 },
  { id:60, soal:'Contoh brainware dalam sistem komputer adalah...', img:null, pilihan:['Keyboard','Windows','Monitor','Programmer'], kunci:3 },

  { id:61, soal:'Mikrofon termasuk perangkat...', img:null, pilihan:['Output','Pemrosesan','Penyimpanan','Input'], kunci:3 },
  { id:62, soal:'Windows adalah contoh...', img:null, pilihan:['Hardware','Brainware','Browser','Sistem operasi'], kunci:3 },
  { id:63, soal:'Perangkat yang menampilkan visual di layar adalah...', img:null, pilihan:['Printer','Monitor','Speaker','Proyektor'], kunci:1 },
  { id:64, soal:'ALU dalam CPU kepanjangan dari...', img:null, pilihan:['Advanced Logic Unit','Arithmetic Language Unit','Arithmetic Logic Unit','Advanced Language Unit'], kunci:2 },
  { id:65, soal:'Teknisi komputer bertugas untuk...', img:null, pilihan:['Membuat program','Menganalisis sistem','Merawat dan memperbaiki hardware','Mengelola database'], kunci:2 },
  { id:66, soal:'Software yang melindungi komputer dari virus disebut...', img:null, pilihan:['Browser','Antivirus','Spreadsheet','Sistem operasi'], kunci:1 },
  { id:67, soal:'Perangkat output yang mencetak ke kertas adalah...', img:null, pilihan:['Scanner','Monitor','Speaker','Printer'], kunci:3 },
  { id:68, soal:'Operator dalam brainware bertugas...', img:null, pilihan:['Membuat program','Mengoperasikan komputer sehari-hari','Merancang sistem','Memperbaiki hardware'], kunci:1 },
  { id:69, soal:'Microsoft PowerPoint digunakan untuk membuat...', img:null, pilihan:['Tabel angka','Slide presentasi','Desain grafis','Program komputer'], kunci:1 },
  { id:70, soal:'Headset digunakan untuk...', img:null, pilihan:['Mencetak dokumen','Komunikasi audio dua arah','Menampilkan gambar','Menyimpan data'], kunci:1 },

  { id:71, soal:'Contoh perangkat input adalah...', img:null, pilihan:['Monitor dan speaker','Printer dan proyektor','Keyboard dan mouse','Headset dan modem'], kunci:2 },
  { id:72, soal:'Contoh perangkat output adalah...', img:null, pilihan:['Keyboard dan mouse','Monitor dan printer','Mikrofon dan headset','CPU dan modem'], kunci:1 },
  { id:73, soal:'Sistem operasi berfungsi untuk...', img:null, pilihan:['Membuat dokumen','Mengelola sumber daya komputer','Mengedit foto','Menjelajahi internet'], kunci:1 },
  { id:74, soal:'Brainware yang merancang solusi sistem informasi disebut...', img:DataAnalist, pilihan:['Operator','Teknisi','Programmer','System Analyst'], kunci:3 },
  { id:75, soal:'Software untuk mengolah gambar secara profesional adalah...', img:null, pilihan:['Microsoft Excel','Google Chrome','Adobe Photoshop','Windows'], kunci:2 },
  { id:76, soal:'Modem termasuk perangkat keras jenis...', img:null, pilihan:['Input','Output','Jaringan','Pemrosesan'], kunci:2 },
  { id:77, soal:'Proyektor sering digunakan dalam kegiatan...', img:null, pilihan:['Menyimpan data','Presentasi dan pembelajaran','Mengedit foto','Mencetak dokumen'], kunci:1 },
  { id:78, soal:'CPU berfungsi sebagai...', img:null, pilihan:['Penyimpan data','Penampil gambar','Otak yang memproses data','Penghubung internet'], kunci:2 },
  { id:79, soal:'Contoh software aplikasi adalah...', img:null, pilihan:['Windows','Linux','Android','Microsoft Word'], kunci:3 },
  { id:80, soal:'Perangkat keras termasuk dalam komponen sistem komputer jenis...', img:null, pilihan:['Software','Brainware','Hardware','Firmware'], kunci:2 },

  { id:81, soal:'Linux termasuk jenis software...', img:null, pilihan:['Aplikasi','Browser','Sistem operasi','Utility'], kunci:2 },
  { id:82, soal:'Printer menghasilkan output berupa...', img:null, pilihan:['Suara','Gambar di layar','Dokumen cetak','Sinyal internet'], kunci:2 },
  { id:83, soal:'Google Chrome digunakan untuk...', img:null, pilihan:['Membuat tabel','Menjelajahi internet','Mengedit foto','Membuat presentasi'], kunci:1 },
  { id:84, soal:'Speaker menghasilkan output berupa...', img:null, pilihan:['Teks','Gambar','Dokumen','Suara'], kunci:3 },
  { id:85, soal:'Contoh sistem operasi mobile adalah...', img:null, pilihan:['Windows','Linux','Android','CorelDRAW'], kunci:2 },
  { id:86, soal:'CorelDRAW termasuk kategori software...', img:null, pilihan:['Sistem operasi','Browser','Desain grafis','Utility'], kunci:2 },
  { id:87, soal:'System Analyst bertugas...', img:null, pilihan:['Merawat hardware','Mengoperasikan komputer','Menganalisis dan merancang sistem','Membuat desain grafis'], kunci:2 },
  { id:88, soal:'Perangkat yang mengubah suara menjadi sinyal digital adalah...', img:null, pilihan:['Speaker','Monitor','Mikrofon','Printer'], kunci:2 },
  { id:89, soal:'Brainware terdiri dari...', img:null, pilihan:['Monitor dan keyboard','Program dan aplikasi','Manusia yang mengoperasikan komputer','Hardware dan software'], kunci:2 },
  { id:90, soal:'Microsoft Excel termasuk contoh software jenis...', img:null, pilihan:['Sistem operasi','Aplikasi spreadsheet','Browser','Utility'], kunci:1 },

  { id:91, soal:'Keyboard digunakan untuk...', img:null, pilihan:['Menampilkan gambar','Memasukkan teks dan perintah','Mencetak dokumen','Menghasilkan suara'], kunci:1 },
  { id:92, soal:'Mouse digunakan untuk...', img:null, pilihan:['Memasukkan teks','Mencetak dokumen','Menggerakkan kursor','Menyimpan data'], kunci:2 },
  { id:93, soal:'Headset menggabungkan fungsi...', img:null, pilihan:['Monitor dan keyboard','Speaker dan mikrofon','Printer dan scanner','Mouse dan keyboard'], kunci:1 },
  { id:94, soal:'Modem digunakan untuk...', img:null, pilihan:['Menyimpan data besar','Menghubungkan ke internet','Mencetak dokumen','Menampilkan video'], kunci:1 },
  { id:95, soal:'Proyektor merupakan perangkat...', img:null, pilihan:['Input','Penyimpanan','Pemrosesan','Output'], kunci:3 },
  { id:96, soal:'Komponen yang memproses semua data dalam komputer adalah...', img:null, pilihan:['RAM','Monitor','CPU','Harddisk'], kunci:2 },
  { id:97, soal:'Contoh software utility adalah...', img:null, pilihan:['Microsoft Word','Windows','Antivirus','CorelDRAW'], kunci:2 },
  { id:98, soal:'Teknisi termasuk kategori...', img:null, pilihan:['Hardware','Software','Firmware','Brainware'], kunci:3 },
  { id:99, soal:'Adobe Photoshop termasuk jenis software...', img:null, pilihan:['Sistem operasi','Browser','Aplikasi pengolah gambar','Utility'], kunci:2 },
  { id:100, soal:'Tanpa ketiga komponen utama sistem komputer, maka komputer...', img:null, pilihan:['Bekerja lebih cepat','Tidak dapat berfungsi dengan baik','Berjalan otomatis','Tidak berpengaruh'], kunci:1 },

  // BRAINWARE - DENGAN GAMBAR
  { id:101, soal:'Gambar berikut merupakan salah satu contoh brainware, yaitu...', img:Administrator, pilihan:['Programmer','Teknisi','Administrator','Operator'], kunci:2 },
  { id:102, soal:'Gambar berikut merupakan salah satu contoh brainware, yaitu...', img:Operator, pilihan:['Administrator','Operator','Teknisi','Programmer'], kunci:1 },
  { id:103, soal:'Gambar berikut merupakan salah satu contoh brainware, yaitu...', img:Programmer, pilihan:['Operator','Administrator','Teknisi','Programmer'], kunci:3 },
  { id:104, soal:'Gambar berikut merupakan salah satu contoh brainware, yaitu...', img:Teknisi, pilihan:['Programmer','Operator','Teknisi','Administrator'], kunci:2 },
  { id:105, soal:'Gambar berikut merupakan salah satu contoh brainware, yaitu...', img:DataAnalist, pilihan:['Teknisi','Data Analis','Operator','Programmer'], kunci:1 },
  { id:106, soal:'Komponen sistem komputer yang terdiri dari manusia disebut...', img:Brainware, pilihan:['Hardware','Software','Firmware','Brainware'], kunci:3 },
]

export const soalEsai = [
  { id:1, soal:'Sebutkan dan jelaskan tiga komponen utama sistem komputer!', kunci:'Hardware adalah perangkat keras fisik yang bisa dilihat dan disentuh. Software adalah perangkat lunak berupa program. Brainware adalah manusia yang mengoperasikan komputer.' },
  { id:2, soal:'Jelaskan perbedaan perangkat input dan output, sertakan contohnya!', kunci:'Perangkat input memasukkan data ke komputer, contoh keyboard dan mouse. Perangkat output menampilkan hasil, contoh monitor dan printer.' },
  { id:3, soal:'Apa fungsi CPU dalam sistem komputer?', kunci:'CPU adalah otak komputer yang memproses semua instruksi dan data. CPU terdiri dari ALU untuk operasi matematika, CU untuk mengatur instruksi, dan Register untuk menyimpan data sementara.' },
  { id:4, soal:'Jelaskan apa itu sistem operasi dan berikan dua contohnya!', kunci:'Sistem operasi adalah software yang mengelola semua sumber daya komputer dan menjembatani pengguna dengan hardware. Contoh Windows dan Linux.' },
  { id:5, soal:'Sebutkan minimal tiga jenis brainware dan jelaskan tugasnya!', kunci:'Programmer membuat program. Operator mengoperasikan komputer sehari-hari. Teknisi merawat dan memperbaiki hardware. System Analyst merancang sistem.' },
  { id:6, soal:'Jelaskan fungsi keyboard dan mouse sebagai perangkat input!', kunci:'Keyboard digunakan untuk memasukkan data berupa teks, angka, dan perintah. Mouse digunakan untuk menggerakkan kursor dan memberikan perintah dengan cara diklik.' },
  { id:7, soal:'Apa perbedaan antara hardware dan software dalam sistem komputer?', kunci:'Hardware adalah perangkat fisik yang bisa dilihat dan disentuh seperti monitor dan keyboard. Software adalah program yang tidak berwujud fisik seperti Windows dan Microsoft Word.' },
  { id:8, soal:'Jelaskan kegunaan Microsoft Excel dan Microsoft PowerPoint!', kunci:'Microsoft Excel digunakan untuk mengolah data angka dan membuat tabel atau grafik. Microsoft PowerPoint digunakan untuk membuat slide presentasi.' },
  { id:9, soal:'Mengapa brainware dianggap komponen terpenting dalam sistem komputer?', kunci:'Karena tanpa manusia yang mengoperasikan, hardware dan software tidak dapat berfungsi dengan optimal. Brainware yang menentukan tujuan dan cara penggunaan komputer.' },
  { id:10, soal:'Sebutkan dua contoh perangkat output dan jelaskan fungsinya!', kunci:'Monitor berfungsi menampilkan hasil pemrosesan dalam bentuk visual. Printer berfungsi mencetak data menjadi dokumen fisik di atas kertas.' },
  { id:11, soal:'Jelaskan fungsi modem dalam sistem komputer!', kunci:'Modem berfungsi menghubungkan komputer ke internet dengan mengubah sinyal digital menjadi sinyal yang dapat ditransmisikan melalui jaringan.' },
  { id:12, soal:'Apa yang dimaksud dengan software open-source? Berikan contohnya!', kunci:'Software open-source adalah perangkat lunak yang kode sumbernya dapat dilihat dan dimodifikasi secara bebas. Contohnya adalah Linux.' },
  { id:13, soal:'Jelaskan kegunaan Adobe Photoshop dan CorelDRAW!', kunci:'Adobe Photoshop digunakan untuk mengedit dan memanipulasi gambar atau foto. CorelDRAW digunakan untuk desain grafis berbasis vektor seperti membuat logo dan ilustrasi.' },
  { id:14, soal:'Sebutkan tiga contoh perangkat input beserta fungsinya!', kunci:'Keyboard untuk memasukkan teks dan perintah. Mouse untuk menggerakkan kursor. Mikrofon untuk memasukkan suara ke dalam komputer.' },
  { id:15, soal:'Jelaskan perbedaan antara sistem operasi dan software aplikasi!', kunci:'Sistem operasi mengelola seluruh sumber daya komputer seperti Windows dan Linux. Software aplikasi digunakan untuk kebutuhan spesifik pengguna seperti Microsoft Word untuk membuat dokumen.' },
  { id:16, soal:'Apa fungsi speaker dan headset sebagai perangkat output?', kunci:'Speaker menghasilkan suara dari sinyal digital yang diproses komputer. Headset menggabungkan fungsi headphone untuk mendengar suara dan mikrofon untuk memasukkan suara.' },
  { id:17, soal:'Jelaskan apa yang dimaksud dengan perangkat keras (hardware)!', kunci:'Hardware adalah komponen fisik dari sistem komputer yang dapat dilihat dan disentuh secara langsung. Contohnya monitor, keyboard, mouse, printer, dan CPU.' },
  { id:18, soal:'Sebutkan dan jelaskan tugas seorang programmer!', kunci:'Programmer adalah brainware yang bertugas membuat dan mengembangkan program atau aplikasi komputer menggunakan bahasa pemrograman untuk memenuhi kebutuhan pengguna.' },
  { id:19, soal:'Jelaskan fungsi proyektor sebagai perangkat output!', kunci:'Proyektor berfungsi memproyeksikan tampilan layar komputer ke permukaan yang lebih besar seperti layar atau tembok, sehingga dapat dilihat banyak orang sekaligus.' },
  { id:20, soal:'Jelaskan hubungan antara hardware, software, dan brainware dalam sistem komputer!', kunci:'Ketiganya saling bergantung. Hardware adalah alat fisiknya, software adalah programnya, dan brainware adalah manusia yang mengoperasikan. Tanpa salah satu, sistem tidak dapat berfungsi optimal.' },
  { id:21, soal:'Apa yang dimaksud dengan perangkat output? Berikan tiga contoh!', kunci:'Perangkat output adalah perangkat yang menampilkan atau menghasilkan hasil pemrosesan komputer. Contohnya monitor, printer, dan speaker.' },
  { id:22, soal:'Jelaskan perbedaan antara sistem operasi Windows dan Linux!', kunci:'Windows adalah sistem operasi berbayar buatan Microsoft dengan tampilan yang mudah digunakan. Linux adalah sistem operasi open-source yang gratis dan lebih banyak digunakan di server.' },
  { id:23, soal:'Apa fungsi mikrofon dalam sistem komputer?', kunci:'Mikrofon berfungsi sebagai perangkat input audio yang mengubah suara menjadi sinyal digital agar dapat diproses oleh komputer.' },
  { id:24, soal:'Jelaskan apa yang dimaksud dengan software dan berikan dua contoh!', kunci:'Software adalah perangkat lunak berupa program atau aplikasi yang tidak berwujud fisik dan memberikan instruksi kepada hardware. Contohnya Windows sebagai sistem operasi dan Microsoft Word sebagai aplikasi.' },
  { id:25, soal:'Sebutkan perbedaan tugas operator dan teknisi dalam sistem komputer!', kunci:'Operator bertugas mengoperasikan komputer sehari-hari untuk menjalankan program sesuai prosedur. Teknisi bertugas merawat dan memperbaiki perangkat keras komputer.' },
  { id:26, soal:'Jelaskan mengapa sistem komputer membutuhkan ketiga komponen utamanya!', kunci:'Karena ketiganya saling melengkapi. Hardware sebagai perangkat fisik, software sebagai program yang dijalankan, dan brainware sebagai manusia yang mengoperasikan. Tanpa salah satu, komputer tidak dapat bekerja.' },
  { id:27, soal:'Apa kegunaan Google Chrome dalam sistem komputer?', kunci:'Google Chrome adalah software aplikasi berupa browser web yang digunakan untuk menjelajahi internet, mengakses website, dan berbagai layanan online.' },
  { id:28, soal:'Jelaskan apa yang dimaksud dengan ALU pada CPU!', kunci:'ALU atau Arithmetic Logic Unit adalah komponen dalam CPU yang bertugas melakukan operasi matematika seperti penjumlahan dan pengurangan, serta operasi logika seperti perbandingan data.' },
  { id:29, soal:'Sebutkan dua contoh software sistem operasi mobile beserta keterangannya!', kunci:'Android adalah sistem operasi mobile buatan Google yang digunakan pada smartphone dan tablet. iOS adalah sistem operasi mobile buatan Apple yang digunakan pada iPhone dan iPad.' },
  { id:30, soal:'Jelaskan manfaat mempelajari sistem komputer bagi kehidupan sehari-hari!', kunci:'Dengan memahami sistem komputer, kita dapat mengoperasikan komputer dengan benar, memilih software yang tepat, merawat hardware dengan baik, dan meningkatkan produktivitas dalam pekerjaan maupun pembelajaran.' },
  { id:31, soal:'Apa perbedaan antara perangkat input dan perangkat jaringan?', kunci:'Perangkat input seperti keyboard dan mouse digunakan untuk memasukkan data ke komputer. Perangkat jaringan seperti modem digunakan untuk menghubungkan komputer ke jaringan internet.' },
  { id:32, soal:'Jelaskan fungsi Control Unit (CU) dalam CPU!', kunci:'Control Unit adalah komponen CPU yang bertugas mengatur dan mengoordinasikan aliran instruksi dalam komputer, memastikan setiap instruksi diproses dengan urutan yang benar.' },
  { id:33, soal:'Berikan contoh penggunaan Microsoft Excel dalam kehidupan sehari-hari!', kunci:'Microsoft Excel digunakan untuk membuat tabel nilai siswa, laporan keuangan, daftar belanja, grafik penjualan, dan berbagai kebutuhan pengolahan data angka.' },
  { id:34, soal:'Apa yang dimaksud dengan sistem operasi dan mengapa komputer membutuhkannya?', kunci:'Sistem operasi adalah software utama yang mengelola semua hardware dan software di komputer. Komputer membutuhkannya karena tanpa sistem operasi, pengguna tidak dapat berinteraksi dengan hardware.' },
  { id:35, soal:'Jelaskan perbedaan antara programmer dan system analyst!', kunci:'Programmer bertugas menulis kode program sesuai spesifikasi yang diberikan. System Analyst bertugas menganalisis kebutuhan sistem dan merancang solusi teknologi yang tepat sebelum diimplementasikan programmer.' },
  { id:36, soal:'Sebutkan tiga kegunaan proyektor dalam kehidupan sehari-hari!', kunci:'Proyektor digunakan untuk presentasi bisnis agar dapat dilihat banyak orang. Dalam pendidikan untuk menampilkan materi pembelajaran. Untuk hiburan menonton film dengan layar besar.' },
  { id:37, soal:'Jelaskan perbedaan antara antivirus sebagai utility dan browser sebagai aplikasi!', kunci:'Antivirus adalah software utility yang bertugas membantu dan melindungi sistem komputer dari ancaman virus. Browser adalah software aplikasi yang digunakan pengguna untuk menjelajahi internet.' },
  { id:38, soal:'Apa fungsi headset dalam komunikasi menggunakan komputer?', kunci:'Headset berfungsi sebagai perangkat input dan output sekaligus. Bagian mikrofon untuk memasukkan suara pengguna, dan bagian headphone untuk mendengarkan suara dari komputer.' },
  { id:39, soal:'Jelaskan mengapa Linux banyak digunakan sebagai sistem operasi server!', kunci:'Linux banyak digunakan di server karena bersifat open-source sehingga gratis, memiliki keamanan yang tinggi, sangat stabil dan jarang crash, serta dapat dikustomisasi sesuai kebutuhan.' },
  { id:40, soal:'Jelaskan peran administrator dalam sistem komputer!', kunci:'Administrator bertugas mengelola, memelihara, dan mengamankan sistem komputer atau jaringan dalam suatu organisasi, termasuk mengatur hak akses pengguna dan memastikan sistem berjalan lancar.' },
  { id:41, soal:'Sebutkan perbedaan antara CorelDRAW dan Adobe Photoshop!', kunci:'CorelDRAW adalah aplikasi desain grafis berbasis vektor yang cocok untuk membuat logo dan ilustrasi. Adobe Photoshop adalah aplikasi berbasis bitmap yang digunakan untuk mengedit foto dan gambar.' },
  { id:42, soal:'Jelaskan apa yang dimaksud dengan perangkat keras input!', kunci:'Perangkat keras input adalah komponen hardware yang digunakan untuk memasukkan data atau perintah ke dalam komputer. Contohnya keyboard untuk teks, mouse untuk kursor, dan mikrofon untuk suara.' },
  { id:43, soal:'Mengapa Microsoft PowerPoint berguna dalam dunia pendidikan?', kunci:'Microsoft PowerPoint berguna dalam pendidikan karena memudahkan guru membuat materi yang menarik dengan teks, gambar, dan animasi, serta memudahkan siswa memahami materi melalui visualisasi.' },
  { id:44, soal:'Jelaskan apa yang dimaksud dengan komponen pemrosesan dalam hardware!', kunci:'Komponen pemrosesan adalah bagian hardware yang bertugas mengolah dan memproses data, yaitu CPU. CPU terdiri dari ALU untuk perhitungan, CU untuk kontrol, dan Register untuk penyimpanan sementara.' },
  { id:45, soal:'Berikan contoh nyata penggunaan brainware dalam kehidupan sehari-hari!', kunci:'Seorang kasir yang mengoperasikan komputer kasir adalah operator. Programmer yang membuat aplikasi belanja online. Teknisi yang memperbaiki komputer rusak. System analyst yang merancang sistem informasi sekolah.' },
  { id:46, soal:'Jelaskan fungsi RAM dalam sistem komputer secara sederhana!', kunci:'RAM atau Random Access Memory adalah memori sementara yang menyimpan data dan program yang sedang aktif dijalankan. Semakin besar RAM, semakin banyak program yang bisa dijalankan bersamaan.' },
  { id:47, soal:'Apa perbedaan antara software berbayar dan software gratis?', kunci:'Software berbayar atau proprietary harus dibeli lisensinya dan kode sumbernya tertutup, contoh Microsoft Office. Software gratis seperti open-source dapat digunakan tanpa biaya dan kode sumbernya terbuka, contoh LibreOffice.' },
  { id:48, soal:'Jelaskan kegunaan mikrofon dan speaker dalam komunikasi online!', kunci:'Mikrofon sebagai perangkat input berfungsi menangkap suara pengguna agar dapat dikirim dalam komunikasi online. Speaker sebagai perangkat output berfungsi menghasilkan suara dari lawan bicara.' },
  { id:49, soal:'Sebutkan dan jelaskan dua jenis software berdasarkan fungsinya!', kunci:'Sistem operasi berfungsi mengelola seluruh sumber daya komputer, contoh Windows. Software aplikasi berfungsi untuk kebutuhan spesifik pengguna, contoh Microsoft Excel untuk mengolah data.' },
  { id:50, soal:'Jelaskan secara singkat cara kerja sistem komputer dari input hingga output!', kunci:'Pengguna memasukkan data melalui perangkat input seperti keyboard. Data dikirim ke CPU untuk diproses sesuai instruksi software. Hasil pemrosesan ditampilkan melalui perangkat output seperti monitor.' },
]