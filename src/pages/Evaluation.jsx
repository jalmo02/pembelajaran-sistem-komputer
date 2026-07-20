import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { sounds } from '../data/sounds'
import { soalPilihanGanda, soalEsai } from '../data/soal'
import { getUserItem, setUserItem } from './utils/userStorage'
import BgHome from '../assets/images/background/bg-home.png'

const TOTAL_PG = 10
const TOTAL_ESAI = 5
const NILAI_PG = 5
const NILAI_ESAI = 10
const WAKTU_DETIK = 20 * 60

// ─── Storage key untuk riwayat evaluasi ───────────────────────────────────────
const STORAGE_EVAL_HISTORY = 'eval_history'

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)
const formatTime = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`

// ═══════════════════════════════════════════════════════════════════
//  SEMANTIC GRADING ENGINE v3
//  - Sinonim sangat diperluas (bahasa formal, informal, typo umum)
//  - Threshold adaptif lebih longgar
//  - Stem ringan bahasa Indonesia
//  - Bonus konsep kritis
// ═══════════════════════════════════════════════════════════════════

// Singkatan dua arah
const ABBR = {
  'cpu':'central processing unit','central processing unit':'cpu',
  'ram':'random access memory','random access memory':'ram',
  'rom':'read only memory','read only memory':'rom',
  'alu':'arithmetic logic unit','arithmetic logic unit':'alu',
  'cu':'control unit','control unit':'cu',
  'os':'operating system','operating system':'os',
  'hdd':'hard disk drive','hard disk drive':'hdd',
  'ssd':'solid state drive','solid state drive':'ssd',
  'gpu':'graphics processing unit','graphics processing unit':'gpu',
  'ios':'iphone operating system',
  'pc':'personal computer','personal computer':'pc',
  'ms':'microsoft','microsoft':'ms',
  'ui':'user interface','ux':'user experience',
  'url':'uniform resource locator',
  'ip':'internet protocol',
  'lan':'local area network','wan':'wide area network',
  'lcd':'liquid crystal display','led':'light emitting diode',
  'usb':'universal serial bus','universal serial bus':'usb',
  'wifi':'wireless fidelity','wi-fi':'wireless fidelity',
  'vga':'video graphics array',
  'hdmi':'high definition multimedia interface',
}

// ── SINONIM SUPER LENGKAP ────────────────────────────────────────
const SYN = [
  ['hardware','perangkat keras','fisik','berwujud','komponen fisik','komponen hardware',
   'perangkat nyata','alat fisik','piranti keras','dapat disentuh','bisa dipegang',
   'dapat diraba','ada wujudnya','nyata','tangible','komponen','alat','peralatan'],
  ['software','perangkat lunak','program','aplikasi','piranti lunak','software komputer',
   'perangkat lunak komputer','app','aplikasi komputer','program komputer','sistem program',
   'tidak berwujud','abstrak','tidak terlihat','tidak dapat disentuh','intangible',
   'kode program','instruksi program','perintah komputer'],
  ['brainware','pengguna','manusia','operator','user','sumber daya manusia','sdm',
   'pengguna komputer','orang','manusia komputer','pemakai','pemakai komputer',
   'pelaku','pengelola','yang menggunakan','yang mengoperasikan','human','people',
   'individu','seseorang'],
  ['input','masukan','memasukkan','menginput','entry','data masuk','memasukan',
   'proses input','memasukkan data','data masukan','inputan','mengentry',
   'mengetikkan','menekan','memberikan','mengirimkan','menyampaikan'],
  ['keyboard','papan ketik','papan tik','papan tombol','mengetik','teks','perintah ketik',
   'tombol ketik','papan keyboard','alat ketik','perangkat ketik','mengetikkan',
   'pengetikan','menuliskan','menulis teks','menginput teks','mengetik huruf',
   'mengetik angka','papan huruf','deretan tombol'],
  ['mouse','tetikus','kursor','menggerakkan kursor','klik','pointer','pointing device',
   'alat klik','menggeser','mengarahkan','mengklik','double klik','scroll',
   'alat penunjuk','perangkat penunjuk','gerakan kursor','menggerakkan pointer',
   'drag','drop','right click','left click'],
  ['mikrofon','microphone','mic','merekam suara','input suara','menangkap suara',
   'merekam audio','alat rekam','menangkap audio','perekam suara','perekam audio',
   'input audio','masukan suara','masukan audio','mendeteksi suara','mikrofone',
   'mike','microphone komputer','alat bicara'],
  ['scanner','pemindai','memindai','scan','scanning','menscan','digitalisasi dokumen',
   'mengubah dokumen ke digital','input gambar','memasukkan gambar','membaca dokumen'],
  ['webcam','kamera','kamera web','merekam video','mengambil gambar','foto','video call'],
  ['output','keluaran','menampilkan','menghasilkan','mencetak','hasil','data keluar',
   'mengoutput','keluarkan','hasilkan','tampilkan','cetak','buah','produk'],
  ['monitor','layar','tampilan','visual','display','menampilkan gambar','layar monitor',
   'layar komputer','screen','layar tampilan','bidang tampil','layar display',
   'layar kaca','tampilan gambar','layar tancap','menampilkan visual','output visual',
   'perangkat tampil','alat tampil','hasil tampilan'],
  ['printer','mencetak','cetak','dokumen cetak','kertas','mencetak dokumen',
   'print','alat cetak','perangkat cetak','mencetak file','output cetak',
   'menghasilkan cetakan','memproduksi dokumen','mencetak teks','mencetak gambar',
   'hard copy','hardcopy','salinan cetak','printout','print out'],
  ['speaker','suara','audio','bunyi','menghasilkan suara','output suara','speeker',
   'alat suara','perangkat suara','output audio','membunyikan','mengeluarkan suara',
   'memutar suara','memutar audio','menghasilkan bunyi','loud speaker','loudspeaker',
   'pengeras suara'],
  ['proyektor','projector','presentasi','layar besar','memproyeksikan','memproyeksikan gambar',
   'memproyeksikan tampilan','proyeksi','memperbesar tampilan','tampilan besar',
   'permukaan besar','layar atau tembok','tembok','dinding','memperbesar gambar',
   'menampilkan di layar besar','memproyeksikan ke dinding','ke layar besar',
   'ke permukaan','output gambar besar','layar proyeksi','screen besar',
   'tampilan ke layar','display besar','image projector','menampilkan layar besar',
   'memperluas tampilan','memproyeksikan ke permukaan','banyak orang bisa melihat',
   'dilihat banyak orang','terlihat dari jauh','gambar besar','tampil besar'],
  ['headset','headphone','earphone','komunikasi audio','earbud','earbuds',
   'alat dengar','mendengarkan audio','mendengarkan suara','perangkat audio',
   'input output audio','headphone dan mic','gabungan speaker mic'],
  ['proses','memproses','mengolah','processing','menjalankan','eksekusi','mengeksekusi',
   'pengolahan','mengerjakan','menghitung','kalkulasi','komputasi','compute',
   'running','berjalan','diproses','diolah','dieksekusi'],
  ['cpu','processor','prosesor','otak komputer','otak','central processing unit',
   'unit pemroses','unit pemrosesan','pemroses utama','chip prosesor','chip',
   'inti komputer','komponen proses','prosesor komputer','central processor',
   'unit pengolah','pengolah data','pengolah instruksi','otak dari komputer',
   'otak pc','otak laptop','unit pemroses pusat'],
  ['alu','arithmetic logic unit','unit aritmatika','unit logika','operasi matematika',
   'perhitungan','logika','aritmatika','matematik','berhitung','kalkulasi matematika',
   'operasi logika','operasi aritmatika','unit hitung','unit kalkulasi',
   'melakukan perhitungan','melakukan operasi','penjumlahan','pengurangan',
   'perkalian','pembagian','AND','OR','NOT'],
  ['cu','control unit','unit kontrol','pengendali','mengatur','koordinasi',
   'unit pengendali','unit pengontrol','mengontrol','mengendalikan','mengkoordinasi',
   'mengkoordinasikan','mengatur alur','pengatur','kontroler','pengontrol instruksi',
   'mengatur instruksi','mengelola instruksi','mengatur eksekusi'],
  ['register','memori sementara','penyimpan sementara','storage sementara',
   'penyimpanan register','penyimpanan cepat','cache tercepat','penyimpan cepat'],
  ['ram','random access memory','memori utama','memori aktif','memori kerja',
   'memori','penyimpanan sementara','memori jangka pendek','working memory',
   'primary memory','main memory','tempat menyimpan sementara','memori volatile',
   'hilang saat mati','daya sementara','simpan sementara','simpan data aktif',
   'memory ram','penyimpan data aktif','menyimpan program yang sedang berjalan'],
  ['rom','read only memory','memori permanen','penyimpanan permanen','firmware',
   'hanya baca','tidak bisa dihapus','tetap tersimpan','non volatile',
   'data tetap','menyimpan bios','bios storage'],
  ['cache','memori cache','penyimpanan cache','memori cepat','buffer','temp'],
  ['harddisk','hard disk','hdd','cakram keras','penyimpanan permanen','storage',
   'penyimpan data','media penyimpan','simpan data','disk','hard drive',
   'menyimpan data','tempat simpan data','penyimpanan data','ruang simpan'],
  ['flashdisk','flash disk','usb drive','thumb drive','flash drive','flasdisk',
   'flashdrive','colokan usb','usb flash','usb memory','removable storage'],
  ['modem','internet','menghubungkan internet','koneksi','jaringan','network',
   'menghubungkan','terhubung','akses internet','perangkat jaringan',
   'modulasi','demodulasi','modulator','demodulator','modulator demodulator',
   'sinyal internet','koneksi internet','penyedia koneksi','router','gateway',
   'menghubungkan ke internet','mengakses internet','online','sambungan internet'],
  ['sinyal','signal','transmisi','modulasi','demodulasi','gelombang',
   'frekuensi','data jaringan','paket data','bit','bandwidth'],
  ['wifi','wireless','nirkabel','tanpa kabel','jaringan nirkabel','koneksi wifi',
   'internet nirkabel','wi fi','wirelless','wireless fidelity'],
  ['sistem operasi','operating system','os','windows','linux','android','macos',
   'mac os','ios','ubuntu','debian','fedora','sistem os','platform',
   'mengelola hardware','mengatur hardware','mengatur sumber daya',
   'antarmuka pengguna','interface sistem','program sistem','perangkat lunak sistem',
   'software sistem','kernel','inti sistem'],
  ['browser','penjelajah','menjelajahi','browsing','berselancar','mengakses internet',
   'chrome','firefox','safari','edge','opera','internet explorer',
   'web browser','penjelajah web','aplikasi browsing','peramban','peramban web',
   'surfing','internet surfing','membuka website','membuka web','buka situs',
   'mengakses website','mengakses situs','membuka halaman web'],
  ['antivirus','virus','utility','keamanan','melindungi','proteksi',
   'anti virus','antivirus software','software keamanan','program keamanan',
   'pelindung','mencegah virus','membasmi virus','mendeteksi virus',
   'keamanan komputer','security software','perlindungan sistem',
   'mencegah malware','malware protection','norton','avast','kaspersky'],
  ['spreadsheet','excel','tabel','data angka','angka','kalkulasi',
   'microsoft excel','aplikasi spreadsheet','lembar kerja','lembar kalkulasi',
   'tabel data','data tabel','pengolah angka','menghitung data','rumus excel',
   'formula','pivot','chart excel','grafik excel','ms excel'],
  ['presentasi','powerpoint','slide','slideshow','microsoft powerpoint',
   'aplikasi presentasi','software presentasi','ms powerpoint','ppt',
   'bahan presentasi','materi presentasi','tampilan slide','slide show',
   'lembar slide','halaman presentasi'],
  ['pengolah kata','word processor','microsoft word','ms word','word',
   'aplikasi word','dokumen','menulis dokumen','mengetik dokumen',
   'membuat dokumen','software dokumen','aplikasi dokumen'],
  ['desain grafis','graphic design','photoshop','corel','coreldraw','illustrator',
   'software desain','aplikasi desain','desain visual','membuat desain'],
  ['vektor','vector','coreldraw','illustrator','logo','skalabel','scalable',
   'gambar vektor','berbasis vektor','format vektor','ai format','cdr format',
   'tidak pecah','tidak blur','tetap tajam','gambar tajam','resolusi bebas',
   'grafis vektor','ilustrasi vektor'],
  ['bitmap','raster','photoshop','foto','pixel','editing foto','piksel',
   'gambar raster','berbasis piksel','format bitmap','psd format','jpg format',
   'jpeg','png','foto digital','gambar digital','image editing','edit foto',
   'olah foto','manipulasi foto'],
  ['open source','terbuka','gratis','bebas','kode terbuka','free','freeware',
   'open sorce','sumber terbuka','kode sumber terbuka','dapat dimodifikasi',
   'bisa dimodifikasi','modifiable','community','komunitas','bebas digunakan'],
  ['berbayar','proprietary','lisensi','closed source','tertutup','license',
   'berlisensi','bayar','harus beli','tidak gratis','komersial','commercial'],
  ['programmer','membuat program','coding','kode program','mengkode','developer',
   'menulis kode','software developer','software engineer','coder','ngoding',
   'bikin program','bikin aplikasi','develop','development','membuat software',
   'membuat aplikasi','membuat sistem','backend','frontend','fullstack',
   'web developer','app developer','programer','programer komputer'],
  ['operator','mengoperasikan','menjalankan komputer','pengguna harian','menjalankan program',
   'menggunakan komputer','memakai komputer','pengguna komputer','user komputer',
   'operasional','menjalankan aplikasi','menggunakan aplikasi','menjalankan sistem',
   'bertugas menjalankan','mengoprasikan','mengoperasi','tugas harian komputer',
   'kasir','sekretaris','staf','pegawai yang pakai komputer'],
  ['teknisi','merawat','memperbaiki','hardware maintenance','servis','perawatan',
   'pemeliharaan','memperbaiki komputer','merawat komputer','perangkat keras',
   'maintenance','servis komputer','teknisi komputer','perbaikan hardware',
   'reparasi','benerin','benerin komputer','ngbenerin','fixing','repair',
   'merakit','instalasi hardware','pasang komponen','ganti komponen',
   'bertugas merawat','bertugas memperbaiki','merawat perangkat',
   'memperbaiki kerusakan','menangani kerusakan hardware','hardware repair'],
  ['administrator','admin','mengelola','mengamankan','hak akses','jaringan admin',
   'system administrator','sysadmin','network admin','mengelola sistem',
   'mengatur sistem','mengatur jaringan','mengelola jaringan','kelola sistem',
   'kelola jaringan','hak akses penuh','akses penuh','super user','root',
   'manage sistem','pengelola sistem','bertanggung jawab sistem',
   'mengamankan sistem','keamanan sistem','backup sistem','restore sistem'],
  ['system analyst','analis','merancang sistem','analisis kebutuhan','perancang',
   'analis sistem','system analysis','perancang sistem','analisis sistem',
   'membuat rancangan','rancangan sistem','desain sistem','sistem design'],
  ['data analyst','analis data','menganalisis data','analisis data','olah data',
   'mengolah data','interpretasi data','membaca data','visualisasi data'],
  ['keuangan','finansial','financial','anggaran','budget','akuntansi','pembukuan',
   'transaksi','transaksi keuangan','pemasukan','pengeluaran','neraca','laba',
   'rugi','laba rugi','gaji','payroll','penggajian','invoice','faktur','tagihan',
   'nota','kas','dana','administrasi keuangan','catatan keuangan',
   'manajemen keuangan','mengelola keuangan','laporan keuangan','keuangan kantor',
   'keuangan perusahaan','arus kas','cash flow','pembayaran','pengelolaan dana'],
  ['nilai','siswa','murid','pelajar','akademik','akademis','rapor','raport',
   'sekolah','prestasi','data nilai','nilai siswa','daftar nilai',
   'administrasi sekolah','data sekolah','nilai ujian','nilai akademik',
   'absensi','daftar hadir','kehadiran siswa'],
  ['belanja','daftar belanja','kebutuhan','kebutuhan rumah tangga','rumah tangga',
   'shopping','shopping list','catatan belanja','list belanja','pengeluaran rumah',
   'kebutuhan harian','daftar kebutuhan','daftar harga','barang belanjaan'],
  ['penjualan','omset','omzet','sales','pendapatan','revenue','bisnis','usaha',
   'laporan penjualan','data penjualan','grafik penjualan','transaksi penjualan',
   'pemasaran','marketing','laba bisnis','hasil penjualan','toko','jualan',
   'stok barang','inventaris','inventory'],
  ['kantor','perusahaan','instansi','tempat kerja','office','perkantoran',
   'administrasi kantor','dunia kerja','lingkungan kerja','organisasi',
   'pekerjaan kantor','tugas kantor','urusan kantor'],
  ['mengelola','manage','mengatur','mengelola sumber daya','me manage',
   'management','pengelolaan','pengaturan','mengurus','urus'],
  ['saling bergantung','berkaitan','tidak dapat dipisahkan','saling melengkapi',
   'terintegrasi','terhubung','berhubungan','saling berhubungan','saling terkait',
   'tidak bisa dipisah','satu kesatuan','saling mendukung','mendukung satu sama lain',
   'complement','komplementer','interdependent'],
  ['menyimpan','simpan','store','storage','penyimpanan','tersimpan','menyimpannya',
   'nyimpan','saving','save'],
  ['mengirim','kirim','transmit','transfer','send','pengiriman','transmisi',
   'transfer data','kirim data'],
  ['menerima','terima','receive','input','penerimaan','diterima'],
  ['mengubah','ubah','convert','konversi','transformasi','berubah','perubahan'],
  ['cepat','kecepatan','speed','fast','quick','performa tinggi','tinggi',
   'efisien','efisiensi','optimal','performa'],
  ['besar','lebih besar','ukuran besar','diperbesar','memperbesar','luas',
   'lebar','ukuran luas','ukuran lebar','size besar','big','large'],
  ['komputer','pc','laptop','notebook','device','perangkat','mesin','alat hitung',
   'alat komputasi','sistem komputer','computer'],
  ['permukaan','dinding','tembok','layar proyeksi','screen','bidang','permukaan datar',
   'bidang proyeksi','tempat proyeksi'],
  ['dilihat','tampak','terlihat','ditampilkan','bisa dilihat','dapat dilihat',
   'tampil','terlihat jelas','keliatan','kelihatan'],
  ['banyak orang','orang banyak','khalayak','umum','semua orang','audiens',
   'audience','penonton','peserta','semua yang hadir','semua yang ada',
   'orang-orang','berbagai orang','publik'],
  ['sehari-hari','harian','rutin','setiap hari','daily','tiap hari',
   'keseharian','rutinitas','pekerjaan sehari','tugas sehari'],
  ['fisik','dapat dilihat','dapat disentuh','nyata','berwujud','tangible',
   'ada fisiknya','ada bendanya','ada wujudnya','konkret','real'],
  ['tidak berwujud','abstrak','tidak terlihat','tidak dapat disentuh','intangible',
   'tidak ada fisiknya','tidak ada bendanya','non fisik','nonfisik','maya'],
  ['produktivitas','efisiensi','lebih baik','optimal','meningkatkan','membantu',
   'mempermudah','mempercepat','mengefisienkan','memperbaiki kinerja'],
  ['keamanan','aman','secure','security','terlindungi','terjaga','proteksi',
   'perlindungan','terkunci','terenkripsi','enkripsi'],
  ['berfungsi','bisa','dapat','mampu','berguna','digunakan untuk','dipakai untuk',
   'berperan','bertugas','bekerja','dimanfaatkan','dioperasikan'],
  ['membantu','menolong','mendukung','support','assist','mempermudah'],
  ['menampilkan','display','show','perlihatkan','tampilkan','munculkan','nampilin'],
  ['menghasilkan','produce','generate','hasilkan','keluarkan','output'],
  ['menghubungkan','connect','sambungkan','link','hubungkan','koneksikan','nyambungin'],
  ['memasukkan','input','masukkan','entry','ketik','tulis','isikan'],
  ['mengeluarkan','output','keluarkan','hasilkan','tampilkan','cetak'],
  ['mencetak','print','cetak','mencetak dokumen','print out','hardcopy'],
  ['menjalankan','run','execute','jalankan','operasikan','aktifkan','start'],
  ['menyalakan','nyalain','hidupkan','power on','turn on','start'],
  ['mematikan','matiin','padamkan','power off','turn off','shutdown'],
]

// Stopword diperluas
const STOP = new Set([
  'yang','dan','atau','ke','di','dari','untuk','dengan','adalah','merupakan',
  'yaitu','seperti','juga','pada','oleh','dalam','ini','itu','akan','dapat',
  'bisa','ada','tidak','lebih','sangat','serta','karena','agar','jika','maka',
  'namun','tetapi','sedangkan','sebuah','suatu','setiap','semua','seluruh',
  'antara','sehingga','agar','supaya','bahwa','ketika','setelah','sebelum',
  'the','a','an','is','are','of','to','in','for','and','or','as','by','its',
  'itu','ini','tersebut','mereka','kita','kami','saya','dia','ia',
  'dua','tiga','empat','lima','satu','beberapa','banyak','contoh',
  'jelaskan','sebutkan','berikan','apa','bagaimana','mengapa','siapa',
  'lah','pun','pula','juga','hanya','saja','bahkan','malah','justru',
  'sudah','telah','sedang','masih','belum','baru','sempat','pernah',
  'selalu','sering','kadang','jarang','tidak','bukan','jangan','harus',
  'perlu','wajib','mungkin','barang','tentu','memang','ternyata',
  'sebenarnya','seharusnya','sebaiknya','seharusnya','biasanya',
  'umumnya','khususnya','terutama','terutama','khusus','umum',
])

const norm = (text) => {
  if (!text) return ''
  let t = text.toLowerCase().trim()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
  Object.entries(ABBR).forEach(([k, v]) => {
    t = t.replace(new RegExp(`\\b${k}\\b`, 'g'), `${k} ${v}`)
  })
  return t
}

const tokenize = (text) => norm(text)
  .split(/\s+/)
  .filter(w => w.length >= 3 && !STOP.has(w))

const stemLight = (word) => {
  if (word.length <= 4) return word
  const prefixes = [
    'menge','mempe','membe','mendi','mengi','mengu',
    'mem','men','meng','me','pe','pem','pen','peng','per',
    'ber','ter','ke','se','di','diper','dipe','dime',
  ]
  const suffixes = ['kan','an','i','nya','lah','pun','kah']
  let w = word
  for (const suf of suffixes) {
    if (w.endsWith(suf) && w.length > suf.length + 3) {
      w = w.slice(0, -suf.length)
      break
    }
  }
  for (const pre of prefixes) {
    if (w.startsWith(pre) && w.length > pre.length + 3) {
      w = w.slice(pre.length)
      break
    }
  }
  return w
}

const stemCache = new Map()
const stem = (w) => {
  if (stemCache.has(w)) return stemCache.get(w)
  const s = stemLight(w)
  stemCache.set(w, s)
  return s
}

const findGroup = (word) => {
  let grp = SYN.find(g => g.includes(word))
  if (grp) return grp
  const s = stem(word)
  if (s !== word) {
    grp = SYN.find(g => g.includes(s))
    if (grp) return grp
    for (const g of SYN) {
      if (g.some(item => stem(item) === s)) return g
    }
  }
  return null
}

const isSame = (a, b) => {
  if (a === b) return true
  const sa = stem(a), sb = stem(b)
  if (sa === sb && sa.length >= 4) return true
  const ga = findGroup(a)
  if (ga) {
    if (ga.includes(b)) return true
    if (ga.includes(sb)) return true
    if (ga.some(item => stem(item) === sb)) return true
  }
  const gb = findGroup(b)
  if (gb) {
    if (gb.includes(a)) return true
    if (gb.includes(sa)) return true
    if (gb.some(item => stem(item) === sa)) return true
  }
  if (a.length >= 5 && b.length >= 5) {
    if (b.includes(a) || a.includes(b)) return true
  }
  if (sa.length >= 5 && sb.length >= 5) {
    if (sb.includes(sa) || sa.includes(sb)) return true
  }
  return false
}

const extractConcepts = (kunci) => {
  const tokens = tokenize(kunci)
  const unique = []
  tokens.forEach(t => {
    if (t.length < 3) return
    if (!unique.some(u => isSame(u, t))) unique.push(t)
  })
  return unique
}

const scoreMatch = (concepts, jawabanTokens) => {
  let hit = 0
  concepts.forEach(c => {
    if (jawabanTokens.some(j => isSame(j, c))) hit++
  })
  return concepts.length > 0 ? hit / concepts.length : 0
}

const isGibberish = (text) => {
  if (!text || text.trim().length < 8) return true
  const t = text.trim()
  const words = t.split(/\s+/).filter(w => w.length >= 2)
  if (words.length < 2) return true
  const uniq = new Set(t.toLowerCase().replace(/\s/g, ''))
  if (uniq.size < 4) return true
  const v = (t.match(/[aiueoAIUEO]/g) || []).length
  const c = (t.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length
  if (!v || !c) return true
  const ratio = v / (v + c)
  if (ratio < 0.08 || ratio > 0.88) return true
  return false
}

const isContohSoal = (soal) => {
  const t = (soal || '').toLowerCase()
  return /\bcontoh\b/.test(t)
    || /\bsalah satu\b/.test(t)
    || /\bsebutkan\s+(satu|1)\b/.test(t)
    || /\bberikan\s+(satu|1)\b/.test(t)
}

const gradeEsai = (soal, kunci, jawaban) => {
  if (isGibberish(jawaban)) return { benar: false, skor: 0, hit: 0, total: 0 }

  const concepts = extractConcepts(kunci)
  const jawabanTokens = tokenize(jawaban)
  const ratio = scoreMatch(concepts, jawabanTokens)
  const hit = Math.round(ratio * concepts.length)

  if (isContohSoal(soal)) {
    return { benar: hit >= 1, skor: ratio, hit, total: concepts.length, criticalRatio: 0 }
  }

  const critLen = Math.max(2, Math.ceil(concepts.length * 0.40))
  const criticalConcepts = concepts.slice(0, critLen)
  const criticalHit = criticalConcepts.filter(
    c => jawabanTokens.some(j => isSame(j, c))
  ).length
  const criticalRatio = critLen > 0 ? criticalHit / critLen : 0

  let threshold
  if      (concepts.length <= 4)  threshold = 0.30
  else if (concepts.length <= 7)  threshold = 0.26
  else if (concepts.length <= 11) threshold = 0.22
  else if (concepts.length <= 16) threshold = 0.19
  else                            threshold = 0.17

  const effectiveThreshold = criticalRatio >= 0.65
    ? threshold * 0.72
    : criticalRatio >= 0.45
    ? threshold * 0.86
    : threshold

  return { benar: ratio >= effectiveThreshold, skor: ratio, hit, total: concepts.length, criticalRatio }
}

// ═══════════════════════════════════════════════════════════════════
//  COMPONENT
// ═══════════════════════════════════════════════════════════════════

const Evaluation = () => {
  const navigate = useNavigate()
  const [user] = useState(() => JSON.parse(localStorage.getItem('currentUser')))
  const [phase, setPhase] = useState('intro')
  const [pgSoal, setPgSoal] = useState([])
  const [esaiSoal, setEsaiSoal] = useState([])
  const [pgAnswers, setPgAnswers] = useState({})
  const [esaiAnswers, setEsaiAnswers] = useState({})
  const [currentIdx, setCurrentIdx] = useState(0)
  const [animDir, setAnimDir] = useState('enter')
  const [score, setScore] = useState(null)
  const [transitioning, setTransitioning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(WAKTU_DETIK)
  const [isWarning, setIsWarning] = useState(false)
  const [gradingResults, setGradingResults] = useState(null)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewIdx, setReviewIdx] = useState(0)
  const [zoomImg, setZoomImg] = useState(null)
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  const timerRef = useRef(null)
  const pgRef = useRef([])
  const pgAnswersRef = useRef({})
  const esaiRef = useRef([])
  const esaiAnswersRef = useRef({})

  useEffect(() => { if (!user) navigate('/auth') }, [user, navigate])
  useEffect(() => { pgRef.current = pgSoal }, [pgSoal])
  useEffect(() => { pgAnswersRef.current = pgAnswers }, [pgAnswers])
  useEffect(() => { esaiRef.current = esaiSoal }, [esaiSoal])
  useEffect(() => { esaiAnswersRef.current = esaiAnswers }, [esaiAnswers])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setZoomImg(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // ─── Simpan riwayat evaluasi (per-user, sinkron dengan panel Home) ─────────
  const saveEvalHistory = useCallback((total, pgBenar, esaiBenar) => {
    const now = new Date()
    const entry = {
      score: total,
      pgBenar,
      esaiBenar,
      date: `${now.getDate()}/${now.getMonth() + 1} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
    }
    const prev = getUserItem(STORAGE_EVAL_HISTORY, [])
    // Simpan maksimal 20 entri, terbaru di depan
    setUserItem(STORAGE_EVAL_HISTORY, [entry, ...prev].slice(0, 20))
  }, [])

  // ─── Simpan skor tertinggi evaluasi ke profil user ──────────────
  const saveScore = useCallback((total) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const idx = users.findIndex(u => u.username === user.username)
    if (idx !== -1 && total > (users[idx].score || 0)) {
      users[idx].score = total
      localStorage.setItem('users', JSON.stringify(users))
      localStorage.setItem('currentUser', JSON.stringify({ ...user, score: total }))
    }
  }, [user])

  const finishEval = useCallback((pg, pgAns, esai, esaiAns) => {
    clearInterval(timerRef.current)

    // Hitung skor pilihan ganda
    let pgScore = 0
    pg.forEach((s, i) => { if (pgAns[i] === s.kunci) pgScore += NILAI_PG })
    const pgBenar = pg.filter((s, i) => pgAns[i] === s.kunci).length

    // Hitung skor esai
    const esaiGrades = esai.map((s, i) => gradeEsai(s.soal, s.kunci, esaiAns[i] || ''))
    const esaiBenar = esaiGrades.filter(g => g.benar).length
    const esaiScore = esaiBenar * NILAI_ESAI

    const total = pgScore + esaiScore

    setGradingResults({ pgBenar, esaiGrades, pgScore, esaiScore, total })
    setScore(total)

    // ─── Simpan riwayat + skor tertinggi ───────────────────────────
    saveEvalHistory(total, pgBenar, esaiBenar)
    saveScore(total)

    setPhase('result')
    setAnimDir('enter')
    setTransitioning(false)
  }, [saveScore, saveEvalHistory])

  useEffect(() => {
    if (phase !== 'pg' && phase !== 'esai') return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          finishEval(pgRef.current, pgAnswersRef.current, esaiRef.current, esaiAnswersRef.current)
          return 0
        }
        if (prev <= 120) setIsWarning(true)
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [phase, finishEval])

  const startEval = () => {
    sounds.click.play()
    const pg = shuffle(soalPilihanGanda).slice(0, TOTAL_PG)
    const esai = shuffle(soalEsai).slice(0, TOTAL_ESAI)
    setPgSoal(pg); setEsaiSoal(esai)
    setPgAnswers({}); setEsaiAnswers({})
    setCurrentIdx(0); setAnimDir('enter')
    setTimeLeft(WAKTU_DETIK); setIsWarning(false)
    setScore(null); setGradingResults(null)
    setReviewOpen(false)
    setPhase('pg')
  }

  const goTo = useCallback((targetIdx, targetPhase) => {
    if (transitioning) return
    setTransitioning(true)
    const isForward = targetPhase !== phase ? true : targetIdx > currentIdx
    setAnimDir(isForward ? 'exit' : 'exit-back')
    setTimeout(() => {
      if (targetPhase && targetPhase !== phase) setPhase(targetPhase)
      setCurrentIdx(targetIdx)
      setAnimDir(isForward ? 'enter' : 'enter-back')
      setTransitioning(false)
    }, 250)
  }, [transitioning, phase, currentIdx])

  const goNext = useCallback(() => {
    if (transitioning) return
    if (phase === 'pg') {
      if (currentIdx < TOTAL_PG - 1) goTo(currentIdx + 1, 'pg')
      else goTo(0, 'esai')
    } else if (phase === 'esai') {
      if (currentIdx < TOTAL_ESAI - 1) goTo(currentIdx + 1, 'esai')
      else finishEval(pgRef.current, pgAnswersRef.current, esaiRef.current, esaiAnswersRef.current)
    }
  }, [transitioning, phase, currentIdx, goTo, finishEval])

  const goPrev = useCallback(() => {
    if (transitioning) return
    if (phase === 'esai' && currentIdx === 0) goTo(TOTAL_PG - 1, 'pg')
    else if (currentIdx > 0) goTo(currentIdx - 1, phase)
  }, [transitioning, currentIdx, phase, goTo])

  const handleBack = () => {
    if (phase === 'pg' || phase === 'esai') {
      setShowExitConfirm(true)
      return
    }
    sounds.click.play()
    navigate('/')
  }

  const confirmExit = () => {
    sounds.click.play()
    setShowExitConfirm(false)
    navigate('/')
  }

  const getScoreColor = (s) => s >= 80 ? '#34D399' : s >= 60 ? '#FBBF24' : '#F87171'
  const getScoreLabel = (s) => {
    if (s >= 90) return 'LUAR BIASA'
    if (s >= 80) return 'SANGAT BAIK'
    if (s >= 70) return 'BAIK'
    if (s >= 60) return 'CUKUP'
    return 'PERLU BELAJAR LAGI'
  }

  const maxScore = TOTAL_PG * NILAI_PG + TOTAL_ESAI * NILAI_ESAI
  const progressPct = phase === 'pg'
    ? ((currentIdx + 1) / (TOTAL_PG + TOTAL_ESAI)) * 100
    : ((TOTAL_PG + currentIdx + 1) / (TOTAL_PG + TOTAL_ESAI)) * 100
  const animClass = animDir === 'enter' ? 's-enter' : animDir === 'exit' ? 's-exit'
    : animDir === 'enter-back' ? 's-enter-back' : 's-exit-back'
  const canGoPrev = !(phase === 'pg' && currentIdx === 0)

  const currentReview = gradingResults && esaiSoal[reviewIdx]
    ? { soal: esaiSoal[reviewIdx], jawaban: esaiAnswers[reviewIdx] || '', grade: gradingResults.esaiGrades[reviewIdx] }
    : null

  return (
    <>
      <style>{`
        @keyframes slideEnter     {from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideExit      {from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-40px)}}
        @keyframes slideEnterBack {from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideExitBack  {from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(40px)}}
        @keyframes popIn  {0%{opacity:0;transform:scale(0.9) translateY(12px)}70%{transform:scale(1.01)}100%{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes glitch {0%,88%,100%{text-shadow:2px 0 #a78bfa,-2px 0 #7c3aed}90%{text-shadow:-3px 0 #a78bfa,3px 0 #7c3aed;letter-spacing:.22em}93%{text-shadow:3px 0 #a78bfa,-3px 0 #7c3aed;letter-spacing:.12em}}
        @keyframes scoreIn{from{opacity:0;transform:scale(0.5)}to{opacity:1;transform:scale(1)}}
        @keyframes lineIn {from{width:0}}
        @keyframes timerPulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes modalIn{0%{opacity:0;transform:scale(0.88) translateY(20px)}70%{transform:scale(1.01)}100%{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes fadeIn {from{opacity:0}to{opacity:1}}
        @keyframes zoomIn {0%{opacity:0;transform:scale(0.7)}70%{transform:scale(1.03)}100%{opacity:1;transform:scale(1)}}

        .s-enter      {animation:slideEnter     .28s cubic-bezier(.23,1,.32,1) both}
        .s-exit       {animation:slideExit      .2s ease-in both}
        .s-enter-back {animation:slideEnterBack .28s cubic-bezier(.23,1,.32,1) both}
        .s-exit-back  {animation:slideExitBack  .2s ease-in both}
        .pop-in       {animation:popIn .4s cubic-bezier(.23,1,.32,1) both}
        .score-in     {animation:scoreIn .6s cubic-bezier(.23,1,.32,1) both}
        .line-in      {animation:lineIn .5s ease both}
        .modal-in     {animation:modalIn .35s cubic-bezier(.23,1,.32,1) both}
        .fade-in      {animation:fadeIn .25s ease both}
        .zoom-in      {animation:zoomIn .3s cubic-bezier(.23,1,.32,1) both}
        .title-glitch {animation:glitch 6s infinite;font-family:'Orbitron',sans-serif}
        .timer-warn   {animation:timerPulse 1s ease-in-out infinite}


        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid rgba(180, 0, 255, 0.4);
          color: #ffffff;
          padding: 8px 16px;
          cursor: pointer;
          font-family:'Orbitron',sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 2px;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.2s;
        }
        .back-btn { transition:all 0.3s; position:relative; overflow:hidden; }
        .back-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,#a78bfa22,transparent); transform:translateX(-100%); transition:transform 0.4s; }
        .back-btn:hover::after { transform:translateX(100%); }
        .back-btn:hover { border-color:#a78bfa !important; box-shadow:0 0 16px #7c3aed66; transform:translateX(-3px); }

        .opt-btn{transition:all .18s cubic-bezier(.23,1,.32,1);cursor:pointer;position:relative;overflow:hidden}
        .opt-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#a78bfa08,transparent);opacity:0;transition:opacity .2s}
        .opt-btn:hover::before{opacity:1}
        .opt-btn:not(.sel):hover{transform:translateX(4px);border-color:#a78bfa44 !important}
        .opt-btn.sel{border-color:#7c3aed !important;background:linear-gradient(135deg,#7c3aed22,#5b21b611) !important}

        .nav-btn{transition:all .2s cubic-bezier(.23,1,.32,1)}
        .nav-btn:not(:disabled):hover{transform:scale(1.04);filter:brightness(1.12) drop-shadow(0 0 8px #a78bfa88)}
        .nav-btn:not(:disabled):active{transform:scale(0.97)}
        .nav-btn:disabled{opacity:0.25;cursor:not-allowed}

        .num-btn{transition:all .2s cubic-bezier(.23,1,.32,1);cursor:pointer}
        .num-btn:hover{transform:scale(1.08)}

        .txt-area{background:#1E1B4B99;border:1px solid #7c3aed33;color:white;resize:none;outline:none;transition:border-color .3s,box-shadow .3s}
        .txt-area:focus{border-color:#a78bfa;box-shadow:0 0 12px #7c3aed33}
        .txt-area::placeholder{color:rgba(255,255,255,.4)}

        .review-tab{transition:all .2s;cursor:pointer}
        .review-tab:hover{border-color:#7c3aed55 !important}
        .review-tab.active{border-color:#a78bfa !important;background:linear-gradient(135deg,#7c3aed22,#5b21b611) !important}

        .scrollbar-hide::-webkit-scrollbar{display:none}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}

        .soal-img{cursor:zoom-in;transition:transform .2s,filter .2s,box-shadow .2s;border-radius:12px}
        .soal-img:hover{transform:scale(1.03);filter:brightness(1.08) drop-shadow(0 0 12px #7c3aed66);box-shadow:0 0 24px #7c3aed44}

        .zoom-overlay{position:fixed;inset:0;z-index:999;background:rgba(4,3,18,0.92);backdrop-filter:blur(18px);display:flex;align-items:center;justify-content:center;cursor:zoom-out;animation:fadeIn .2s ease both}
        .zoom-overlay img{max-width:90vw;max-height:88vh;object-fit:contain;border-radius:16px;border:1px solid #7c3aed55;box-shadow:0 0 80px #7c3aed44,0 0 200px #7c3aed11;animation:zoomIn .3s cubic-bezier(.23,1,.32,1) both}
        .zoom-close{position:absolute;top:20px;right:24px;width:40px;height:40px;border-radius:50%;background:#1E1B4B;border:1px solid #7c3aed44;color:#ffffff;font-size:20px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}
        .zoom-close:hover{background:#7c3aed33;border-color:#a78bfa;transform:scale(1.1)}
        .zoom-hint{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:#1E1B4B99;border:1px solid #7c3aed22;padding:6px 16px;border-radius:999px;color:rgba(255,255,255,.75);font-size:12px;font-family:'Rajdhani',sans-serif;letter-spacing:1px;white-space:nowrap}

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

      <div className="h-screen flex flex-col font-body relative overflow-hidden"
        style={{backgroundImage:`url(${BgHome})`,backgroundSize:'cover',backgroundPosition:'center'}}>
        <div className="absolute inset-0 bg-[#0a0820]/90"/>
        <div className="absolute inset-0 opacity-[0.025]"
          style={{backgroundImage:'linear-gradient(#a78bfa 1px,transparent 1px),linear-gradient(90deg,#a78bfa 1px,transparent 1px)',backgroundSize:'48px 48px'}}/>

        <div className="relative z-10 flex flex-col h-full">

          {/* ── HEADER ── */}
          <div className="flex items-center justify-between px-6 pt-5 pb-2 flex-shrink-0">
            <button onClick={handleBack}
              className="back-btn px-4 py-2 rounded-xl text-white text-base font-bold flex items-center gap-2"
              style={{ background:'#1E1B4B', border:'1px solid #7c3aed55' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>KEMBALI</span>
            </button>
            <div className="text-center">
              <h1 className="title-glitch text-2xl font-black text-white uppercase tracking-widest">EVALUASI</h1>
              <p className="text-white text-sm tracking-widest" style={{fontFamily:'Rajdhani'}}>SISTEM KOMPUTER</p>
            </div>
            <div className="min-w-[90px] text-right">
              {(phase==='pg'||phase==='esai') && (
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${isWarning?'timer-warn':''}`}
                  style={{background:isWarning?'#7f1d1d44':'#1E1B4B',border:`1px solid ${isWarning?'#F87171':'#7c3aed44'}`}}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{background:isWarning?'#F87171':'#a78bfa',boxShadow:`0 0 6px ${isWarning?'#F87171':'#a78bfa'}`}}/>
                  <p className="font-black text-lg" style={{fontFamily:'Orbitron',color:isWarning?'#F87171':'white'}}>{formatTime(timeLeft)}</p>
                </div>
              )}
            </div>
          </div>

          {/* ── PROGRESS BAR ── */}
          {(phase==='pg'||phase==='esai') && (
            <div className="px-6 mb-2 flex-shrink-0">
              <div className="h-0.5 rounded-full overflow-hidden" style={{background:'#1E1B4B'}}>
                <div className="h-full rounded-full" style={{width:`${progressPct}%`,background:'linear-gradient(90deg,#7c3aed,#a78bfa)',transition:'width .3s'}}/>
              </div>
            </div>
          )}

          {/* ── CONTENT ── */}
          <div className="flex-1 overflow-hidden px-6 pb-5">

            {/* ═══ INTRO ═══ */}
            {phase==='intro' && (
              <div className="h-full flex items-center justify-center">
                <div className="pop-in w-full max-w-4xl">
                  <div className="rounded-3xl overflow-hidden"
                    style={{background:'linear-gradient(135deg,#13113A,#1a1740)',border:'1px solid #7c3aed44',boxShadow:'0 0 80px #7c3aed0a'}}>
                    <div className="h-0.5 w-full" style={{background:'linear-gradient(90deg,#7c3aed,#a78bfa,#7c3aed)'}}/>
                    <div className="flex">
                      <div className="flex-1 p-8" style={{borderRight:'1px solid #7c3aed1a'}}>
                        <p className="text-white/70 text-sm uppercase tracking-widest mb-1" style={{fontFamily:'Rajdhani'}}>Ujian</p>
                        <h2 className="text-white font-black text-3xl uppercase tracking-wider mb-1" style={{fontFamily:'Orbitron',textShadow:'0 0 20px #7c3aed44'}}>
                          Sistem<br/>Komputer
                        </h2>
                        <div className="line-in h-px w-20 mt-3 mb-6" style={{background:'linear-gradient(90deg,#7c3aed,transparent)'}}/>
                        {[
                          {label:'Pilihan Ganda',val:`${TOTAL_PG} soal`,note:`${NILAI_PG} poin / soal`,color:'#818CF8'},
                          {label:'Esai',val:`${TOTAL_ESAI} soal`,note:`${NILAI_ESAI} poin / soal`,color:'#34D399'},
                          {label:'Nilai Maksimum',val:`${maxScore} poin`,note:'',color:'#FBBF24'},
                          {label:'Waktu',val:'20 Menit',note:'auto-submit jika habis',color:'#F87171'},
                        ].map((item,i)=>(
                          <div key={i} className="flex items-center justify-between py-2.5" style={{borderBottom:'1px solid #7c3aed0f'}}>
                            <span className="text-white text-base" style={{fontFamily:'Rajdhani'}}>{item.label}</span>
                            <div className="text-right">
                              <span className="font-black text-base" style={{color:item.color,fontFamily:'Orbitron'}}>{item.val}</span>
                              {item.note && <p className="text-sm text-white/60">{item.note}</p>}
                            </div>
                          </div>
                        ))}
                        <button onClick={startEval}
                          className="nav-btn glow-btn mt-6 w-full py-4 rounded-2xl text-white font-black uppercase tracking-widest"
                          style={{background:'linear-gradient(135deg,#7c3aed,#5b21b6)',boxShadow:'0 0 30px #7c3aed33',fontFamily:'Orbitron',fontSize:'1.05rem'}}>
                          MULAI EVALUASI
                        </button>
                      </div>
                      <div className="w-64 p-8" style={{background:'#0f0d2e44'}}>
                        <p className="text-white font-black text-base uppercase tracking-wider mb-4" style={{fontFamily:'Orbitron'}}>Petunjuk</p>
                        {[
                          ['01','Baca setiap soal dengan teliti sebelum menjawab.'],
                          ['02','Soal dipilih secara acak dari bank soal.'],
                          ['03','Esai dinilai berdasarkan konsep — kalimat berbeda tapi makna benar tetap diterima.'],
                          ['04','Singkatan seperti RAM, CPU, ALU, HDD, SSD dikenali otomatis.'],
                          ['05','Klik gambar soal untuk memperbesar tampilannya.'],
                          ['06','Setelah selesai, kamu bisa cek review jawaban esai.'],
                        ].map(([n,t])=>(
                          <div key={n} className="flex gap-3 mb-4">
                            <span className="text-sm font-black flex-shrink-0 mt-0.5" style={{color:'#a78bfa',fontFamily:'Orbitron'}}>{n}</span>
                            <p className="text-white/80 text-sm leading-relaxed">{t}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ PILIHAN GANDA ═══ */}
            {phase==='pg' && pgSoal.length>0 && (
              <div className={`h-full flex gap-5 max-w-6xl mx-auto ${animClass}`}>
                <div className="flex-1 flex flex-col gap-3 overflow-hidden">
                  <div className="rounded-2xl p-5 flex-shrink-0"
                    style={{background:'linear-gradient(135deg,#13113A,#1a1740)',border:'1px solid #7c3aed33'}}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-black uppercase tracking-widest" style={{color:'#a78bfa',fontFamily:'Orbitron'}}>
                        Soal {currentIdx+1} dari {TOTAL_PG}
                      </span>
                      <div className="h-px flex-1" style={{background:'linear-gradient(90deg,#7c3aed22,transparent)'}}/>
                      <span className="text-sm text-white/60" style={{fontFamily:'Rajdhani'}}>Pilihan Ganda — {NILAI_PG} poin</span>
                    </div>
                    <p className="text-white text-lg leading-relaxed">{pgSoal[currentIdx].soal}</p>
                    {pgSoal[currentIdx].img && (
                      <div className="mt-4 flex justify-start">
                        <div className="rounded-xl p-3 inline-block" style={{background:'#1E1B4B',border:'1px solid #7c3aed22'}}>
                          <div className="relative group">
                            <img
                              src={pgSoal[currentIdx].img}
                              className="soal-img h-28 object-contain"
                              style={{filter:'drop-shadow(0 0 8px #7c3aed55)'}}
                              onClick={() => setZoomImg(pgSoal[currentIdx].img)}
                              title="Klik untuk memperbesar"
                            />
                            <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{background:'#1E1B4Bcc',border:'1px solid #7c3aed44',borderRadius:6,padding:'2px 6px'}}>
                              <span style={{fontSize:10,color:'#ffffff',fontFamily:'Rajdhani',letterSpacing:1}}>🔍 PERBESAR</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-hide">
                    {pgSoal[currentIdx].pilihan.map((pil,pi)=>{
                      const isSel = pgAnswers[currentIdx]===pi
                      return (
                        <button key={pi}
                          onClick={()=>{sounds.click.play();setPgAnswers(p=>({...p,[currentIdx]:pi}))}}
                          className={`opt-btn w-full text-left px-4 py-3.5 rounded-xl ${isSel?'sel':''}`}
                          style={{background:'#13113A',border:'1px solid #7c3aed1a'}}>
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-black"
                              style={{background:isSel?'linear-gradient(135deg,#7c3aed,#5b21b6)':'#1E1B4B',border:isSel?'none':'1px solid #7c3aed22',color:isSel?'white':'rgba(255,255,255,.6)',fontFamily:'Orbitron'}}>
                              {['A','B','C','D'][pi]}
                            </div>
                            <p className="text-white text-lg leading-relaxed">{pil}</p>
                            {isSel && <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:'#a78bfa',boxShadow:'0 0 6px #a78bfa'}}/>}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex gap-3 flex-shrink-0">
                    <button onClick={()=>{sounds.click.play();goPrev()}} disabled={!canGoPrev}
                      className="nav-btn glow-btn px-5 py-3 rounded-xl text-white font-bold text-base"
                      style={{background:'#1E1B4B',border:'1px solid #7c3aed33',fontFamily:'Rajdhani'}}>
                      ← SEBELUMNYA
                    </button>
                    <button onClick={()=>{sounds.click.play();goNext()}}
                      className="nav-btn glow-btn flex-1 py-3 rounded-xl text-white font-black text-base"
                      style={{background:'linear-gradient(135deg,#7c3aed,#5b21b6)',boxShadow:'0 0 16px #7c3aed33',fontFamily:'Orbitron'}}>
                      {currentIdx===TOTAL_PG-1?'LANJUT KE ESAI →':'BERIKUTNYA →'}
                    </button>
                  </div>
                </div>

                {/* Panel kanan PG */}
                <div className="w-56 flex flex-col gap-3 flex-shrink-0">
                  <div className="rounded-2xl p-4" style={{background:'#13113A',border:'1px solid #7c3aed22'}}>
                    <p className="text-white/70 text-sm uppercase tracking-widest mb-3" style={{fontFamily:'Rajdhani'}}>Navigasi Soal PG</p>
                    <div className="flex flex-wrap gap-2">
                      {pgSoal.map((_,i)=>(
                        <button key={i} onClick={()=>goTo(i,'pg')}
                          className="num-btn w-10 h-10 rounded-xl text-base font-black"
                          style={{
                            background:pgAnswers[i]!==undefined?'linear-gradient(135deg,#7c3aed,#5b21b6)':i===currentIdx?'#2D2A6E':'#1E1B4B',
                            border:i===currentIdx?'1px solid #a78bfa':'1px solid #7c3aed22',
                            color:pgAnswers[i]!==undefined?'white':i===currentIdx?'#ffffff':'rgba(255,255,255,.5)',
                            fontFamily:'Orbitron',
                          }}>
                          {i+1}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 flex flex-col gap-1.5" style={{borderTop:'1px solid #7c3aed11'}}>
                      {[
                        {bg:'linear-gradient(135deg,#7c3aed,#5b21b6)',label:'Terjawab'},
                        {bg:'#2D2A6E',border:'1px solid #a78bfa',label:'Aktif'},
                        {bg:'#1E1B4B',border:'1px solid #7c3aed22',label:'Belum dijawab'},
                      ].map((s,i)=>(
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded" style={{background:s.bg,border:s.border}}/>
                          <p className="text-white/70 text-sm" style={{fontFamily:'Rajdhani'}}>{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl p-4" style={{background:'#13113A',border:'1px solid #7c3aed22'}}>
                    <p className="text-white/70 text-sm uppercase tracking-widest mb-2" style={{fontFamily:'Rajdhani'}}>Progress</p>
                    <p className="font-black text-2xl" style={{color:'#a78bfa',fontFamily:'Orbitron'}}>{Object.keys(pgAnswers).length} / {TOTAL_PG}</p>
                    <p className="text-white/60 text-sm mt-0.5" style={{fontFamily:'Rajdhani'}}>soal terjawab</p>
                    <div className="mt-2 h-1 rounded-full overflow-hidden" style={{background:'#1E1B4B'}}>
                      <div className="h-full rounded-full" style={{width:`${(Object.keys(pgAnswers).length/TOTAL_PG)*100}%`,background:'linear-gradient(90deg,#7c3aed,#a78bfa)',transition:'width .3s'}}/>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ ESAI ═══ */}
            {phase==='esai' && esaiSoal.length>0 && (
              <div className={`h-full flex gap-5 max-w-6xl mx-auto ${animClass}`}>
                <div className="flex-1 flex flex-col gap-3 overflow-hidden">
                  <div className="rounded-2xl p-5 flex-shrink-0"
                    style={{background:'linear-gradient(135deg,#0a2a1f,#13113A)',border:'1px solid #34D39922'}}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-black uppercase tracking-widest" style={{color:'#34D399',fontFamily:'Orbitron'}}>
                        Esai {currentIdx+1} dari {TOTAL_ESAI}
                      </span>
                      <div className="h-px flex-1" style={{background:'linear-gradient(90deg,#34D39922,transparent)'}}/>
                      <span className="text-sm text-white/60" style={{fontFamily:'Rajdhani'}}>Esai — {NILAI_ESAI} poin</span>
                    </div>
                    <p className="text-white text-lg leading-relaxed">{esaiSoal[currentIdx].soal}</p>
                  </div>

                  <textarea
                    className="txt-area flex-1 rounded-2xl p-5 text-lg leading-relaxed"
                    placeholder="Tulis jawaban kamu di sini. Kalimat berbeda tapi konsep benar tetap diterima..."
                    value={esaiAnswers[currentIdx]||''}
                    onChange={e=>setEsaiAnswers(p=>({...p,[currentIdx]:e.target.value}))}
                  />

                  <div className="flex-shrink-0 flex items-center gap-3">
                    <div className="flex-1 h-1 rounded-full overflow-hidden" style={{background:'#1E1B4B'}}>
                      <div className="h-full rounded-full transition-all" style={{
                        width:`${Math.min(100,((esaiAnswers[currentIdx]||'').length/120)*100)}%`,
                        background:(esaiAnswers[currentIdx]||'').length>=60?'linear-gradient(90deg,#059669,#34D399)':(esaiAnswers[currentIdx]||'').length>=20?'linear-gradient(90deg,#7c3aed,#a78bfa)':'#F87171'
                      }}/>
                    </div>
                    <span className="text-sm flex-shrink-0" style={{fontFamily:'Rajdhani',color:(esaiAnswers[currentIdx]||'').length>=60?'#34D399':(esaiAnswers[currentIdx]||'').length>=20?'#a78bfa':'#F87171'}}>
                      {(esaiAnswers[currentIdx]||'').length} karakter
                    </span>
                  </div>

                  <div className="flex gap-3 flex-shrink-0">
                    <button onClick={()=>{sounds.click.play();goPrev()}}
                      className="nav-btn glow-btn px-5 py-3 rounded-xl text-white font-bold text-base"
                      style={{background:'#1E1B4B',border:'1px solid #34D39922',fontFamily:'Rajdhani'}}>
                      ← SEBELUMNYA
                    </button>
                    <button onClick={()=>{sounds.click.play();goNext()}}
                      className="nav-btn glow-btn flex-1 py-3 rounded-xl text-white font-black text-base"
                      style={{background:'linear-gradient(135deg,#059669,#047857)',boxShadow:'0 0 16px #34D39922',fontFamily:'Orbitron'}}>
                      {currentIdx===TOTAL_ESAI-1?'SELESAI →':'BERIKUTNYA →'}
                    </button>
                  </div>
                </div>

                {/* Panel kanan Esai */}
                <div className="w-56 flex flex-col gap-3 flex-shrink-0">
                  <div className="rounded-2xl p-4" style={{background:'#13113A',border:'1px solid #7c3aed22'}}>
                    <p className="text-white/70 text-sm uppercase tracking-widest mb-3" style={{fontFamily:'Rajdhani'}}>Navigasi Esai</p>
                    <div className="flex flex-col gap-2">
                      {esaiSoal.map((_,i)=>(
                        <button key={i} onClick={()=>goTo(i,'esai')}
                          className="num-btn w-full py-2.5 rounded-xl text-sm font-black text-left px-3"
                          style={{
                            background:(esaiAnswers[i]||'').length>=20?i===currentIdx?'linear-gradient(135deg,#059669,#047857)':'linear-gradient(135deg,#05966966,#04785766)':i===currentIdx?'#2D2A6E':'#1E1B4B',
                            border:i===currentIdx?'1px solid #a78bfa':'1px solid #7c3aed22',
                            color:(esaiAnswers[i]||'').length>=20?'white':i===currentIdx?'#ffffff':'rgba(255,255,255,.5)',
                            fontFamily:'Orbitron',
                          }}>
                          <span className="text-sm">Esai {i+1}</span>
                          {(esaiAnswers[i]||'').length>=20 && <span className="ml-2 text-sm opacity-80">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl p-4" style={{background:'#13113A',border:'1px solid #7c3aed22'}}>
                    <p className="text-white/70 text-sm uppercase tracking-widest mb-2" style={{fontFamily:'Rajdhani'}}>Info Penilaian</p>
                    <div className="flex flex-col gap-2">
                      {[
                        {icon:'🧠',text:'Dinilai berdasarkan konsep, bukan kata per kata'},
                        {icon:'🔤',text:'RAM, CPU, ALU, HDD, SSD, GPU dikenali otomatis'},
                        {icon:'✅',text:'Kalimat beda tapi makna sama = diterima'},
                        {icon:'📝',text:'Jawaban singkat tapi tepat tetap bisa benar'},
                        {icon:'💬',text:'Bahasa informal atau typo ringan masih dikenali'},
                      ].map((item,i)=>(
                        <div key={i} className="flex gap-2 items-start">
                          <span className="text-sm flex-shrink-0 mt-0.5">{item.icon}</span>
                          <p className="text-white/80 text-sm leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ RESULT ═══ */}
            {phase==='result' && score!==null && gradingResults && (
              <div className="h-full flex items-center justify-center">
                <div className="pop-in w-full max-w-4xl">
                  <div className="rounded-3xl overflow-hidden"
                    style={{background:'linear-gradient(135deg,#13113A,#1a1740)',border:'1px solid #7c3aed44',boxShadow:'0 0 80px #7c3aed0a'}}>
                    <div className="h-0.5 w-full" style={{background:`linear-gradient(90deg,#7c3aed,${getScoreColor(score)},#7c3aed)`}}/>
                    <div className="flex">
                      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center" style={{borderRight:'1px solid #7c3aed1a'}}>
                        <p className="text-white/70 text-sm uppercase tracking-widest mb-2" style={{fontFamily:'Rajdhani'}}>Nilai Akhir</p>
                        <div className="score-in">
                          <p className="font-black leading-none" style={{fontSize:'5.8rem',fontFamily:'Orbitron',color:getScoreColor(score),textShadow:`0 0 40px ${getScoreColor(score)}66`}}>
                            {score}
                          </p>
                        </div>
                        <p className="text-white/70 text-base mt-1 mb-3" style={{fontFamily:'Rajdhani'}}>dari {maxScore} poin</p>
                        <div className="px-6 py-2 rounded-full mb-3" style={{background:`${getScoreColor(score)}12`,border:`1px solid ${getScoreColor(score)}33`}}>
                          <p className="font-black text-base" style={{color:getScoreColor(score),fontFamily:'Orbitron'}}>{getScoreLabel(score)}</p>
                        </div>
                        {score>(user.score||0) && (
                          <div className="px-5 py-1.5 rounded-full mb-3" style={{background:'#FBBF2412',border:'1px solid #FBBF2433'}}>
                            <p className="text-sm font-black" style={{color:'#FBBF24',fontFamily:'Rajdhani'}}>REKOR BARU — Tersimpan ke profil</p>
                          </div>
                        )}
                        <button onClick={()=>{sounds.click.play();setReviewIdx(0);setReviewOpen(true)}}
                          className="nav-btn glow-btn w-full py-3 rounded-2xl text-white font-black text-base mb-3"
                          style={{background:'linear-gradient(135deg,#0a2a1f,#064e3b)',border:'1px solid #34D39944',boxShadow:'0 0 16px #34D39922',fontFamily:'Orbitron'}}>
                          📋 REVIEW JAWABAN ESAI
                        </button>
                        <div className="flex gap-3 w-full">
                          <button onClick={startEval}
                            className="nav-btn glow-btn flex-1 py-3 rounded-2xl text-white font-black text-base"
                            style={{background:'#1E1B4B',border:'1px solid #7c3aed44',fontFamily:'Orbitron'}}>
                            ULANGI
                          </button>
                          <button onClick={handleBack}
                            className="nav-btn glow-btn flex-1 py-3 rounded-2xl text-white font-black text-base"
                            style={{background:'linear-gradient(135deg,#7c3aed,#5b21b6)',boxShadow:'0 0 20px #7c3aed33',fontFamily:'Orbitron'}}>
                            SELESAI
                          </button>
                        </div>
                      </div>

                      <div className="w-72 p-8 flex flex-col justify-center gap-4">
                        <p className="text-white font-black text-base uppercase tracking-wider" style={{fontFamily:'Orbitron'}}>Rincian</p>
                        {[
                          {label:'Pilihan Ganda',benar:gradingResults.pgBenar,total:TOTAL_PG,poin:gradingResults.pgScore,max:TOTAL_PG*NILAI_PG,color:'#818CF8'},
                          {label:'Esai',benar:gradingResults.esaiGrades.filter(g=>g.benar).length,total:TOTAL_ESAI,poin:gradingResults.esaiScore,max:TOTAL_ESAI*NILAI_ESAI,color:'#34D399'},
                        ].map((item,i)=>(
                          <div key={i} className="rounded-2xl p-4" style={{background:'#1E1B4B',border:`1px solid ${item.color}1a`}}>
                            <div className="flex justify-between mb-2">
                              <p className="text-white/80 text-sm" style={{fontFamily:'Rajdhani'}}>{item.label}</p>
                              <p className="font-black text-base" style={{color:item.color,fontFamily:'Orbitron'}}>{item.poin} / {item.max}</p>
                            </div>
                            <div className="h-1 rounded-full overflow-hidden" style={{background:'#0f0d2e'}}>
                              <div className="h-full rounded-full line-in" style={{width:`${(item.benar/item.total)*100}%`,background:item.color}}/>
                            </div>
                            <p className="text-sm mt-1.5 text-white/70" style={{fontFamily:'Rajdhani'}}>{item.benar} dari {item.total} soal benar</p>
                          </div>
                        ))}
                        <div className="rounded-2xl p-4" style={{background:'#1E1B4B',border:'1px solid #34D39922'}}>
                          <p className="text-white/70 text-sm uppercase tracking-widest mb-2" style={{fontFamily:'Rajdhani'}}>Detail Esai</p>
                          <div className="flex flex-col gap-1.5">
                            {gradingResults.esaiGrades.map((g,i)=>(
                              <div key={i} className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                                  style={{background:g.benar?'#05966933':'#7f1d1d33',color:g.benar?'#34D399':'#F87171',fontFamily:'Orbitron'}}>
                                  {g.benar?'✓':'✗'}
                                </div>
                                <p className="text-sm text-white/80" style={{fontFamily:'Rajdhani'}}>Esai {i+1}</p>
                                <div className="flex-1 h-px rounded" style={{background:g.benar?`#34D399${Math.round(g.skor*99).toString(16).padStart(2,'0')}`:'#F8717133'}}/>
                                <p className="text-sm" style={{color:g.benar?'#34D399':'#F87171',fontFamily:'Orbitron'}}>{g.benar?'+10':'+0'}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-2xl p-4" style={{background:'#1E1B4B',border:'1px solid #7c3aed1a'}}>
                          <p className="text-white/70 text-sm mb-2" style={{fontFamily:'Rajdhani'}}>Persentase</p>
                          <div className="h-1.5 rounded-full overflow-hidden" style={{background:'#0f0d2e'}}>
                            <div className="h-full rounded-full line-in" style={{width:`${Math.round((score/maxScore)*100)}%`,background:`linear-gradient(90deg,#7c3aed,${getScoreColor(score)})`}}/>
                          </div>
                          <p className="font-black text-xl mt-1.5" style={{color:getScoreColor(score),fontFamily:'Orbitron'}}>{Math.round((score/maxScore)*100)}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ══ IMAGE ZOOM ══ */}
      {zoomImg && (
        <div className="zoom-overlay" onClick={() => setZoomImg(null)}>
          <button className="zoom-close glow-btn" onClick={() => setZoomImg(null)}>✕</button>
          <img src={zoomImg} alt="Soal" onClick={e => e.stopPropagation()} />
          <div className="zoom-hint">Klik di luar gambar atau tekan ESC untuk menutup</div>
        </div>
      )}

      {/* ══ REVIEW MODAL ══ */}
      {reviewOpen && currentReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{background:'rgba(5,4,22,0.92)',backdropFilter:'blur(16px)'}}
          onClick={()=>setReviewOpen(false)}>
          <div className="modal-in w-full max-w-2xl rounded-3xl overflow-hidden"
            style={{background:'linear-gradient(135deg,#13113A,#1a1740)',border:'1px solid #7c3aed55',boxShadow:'0 0 80px #7c3aed44',maxHeight:'90vh',display:'flex',flexDirection:'column'}}
            onClick={e=>e.stopPropagation()}>

            <div className="flex-shrink-0">
              <div className="h-0.5 w-full" style={{background:'linear-gradient(90deg,#7c3aed,#34D399,#7c3aed)'}}/>
              <div className="flex items-center justify-between px-6 py-4" style={{borderBottom:'1px solid #7c3aed1a'}}>
                <div>
                  <p className="text-white font-black text-base uppercase tracking-wider" style={{fontFamily:'Orbitron'}}>Review Jawaban Esai</p>
                  <p className="text-white/70 text-sm mt-0.5" style={{fontFamily:'Rajdhani'}}>Bandingkan jawabanmu dengan kunci</p>
                </div>
                <button onClick={()=>setReviewOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all glow-btn">✕</button>
              </div>
              <div className="flex gap-2 px-6 py-3" style={{borderBottom:'1px solid #7c3aed1a'}}>
                {gradingResults.esaiGrades.map((g,i)=>(
                  <button key={i} onClick={()=>setReviewIdx(i)}
                    className={`review-tab flex-1 py-2 rounded-xl text-sm font-black flex flex-col items-center gap-1 ${reviewIdx===i?'active':''}`}
                    style={{background:'#1E1B4B',border:'1px solid #7c3aed22',fontFamily:'Orbitron'}}>
                    <span style={{color:reviewIdx===i?'#ffffff':'rgba(255,255,255,.55)'}}>E{i+1}</span>
                    <div className="w-4 h-4 rounded-full flex items-center justify-center"
                      style={{background:g.benar?'#05966933':'#7f1d1d33',color:g.benar?'#34D399':'#F87171',fontSize:'10px'}}>
                      {g.benar?'✓':'✗'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-5">
              <div className="fade-in flex flex-col gap-4">
                <div className="rounded-2xl p-4" style={{background:'#1E1B4B',border:'1px solid #7c3aed22'}}>
                  <p className="text-sm font-black uppercase tracking-wider mb-2" style={{color:'#a78bfa',fontFamily:'Orbitron'}}>Pertanyaan</p>
                  <p className="text-white text-lg leading-relaxed">{currentReview.soal.soal}</p>
                </div>
                <div className="rounded-2xl p-4" style={{background:currentReview.grade.benar?'#05966911':'#7f1d1d11',border:`1px solid ${currentReview.grade.benar?'#34D39944':'#F8717144'}`}}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-black uppercase tracking-wider" style={{color:currentReview.grade.benar?'#34D399':'#F87171',fontFamily:'Orbitron'}}>
                      Jawabanmu {currentReview.grade.benar?'✓ Benar':'✗ Kurang Tepat'}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-16 rounded-full overflow-hidden" style={{background:'#0f0d2e'}}>
                        <div className="h-full rounded-full" style={{width:`${Math.round(currentReview.grade.skor*100)}%`,background:currentReview.grade.benar?'#34D399':'#F87171'}}/>
                      </div>
                      <span className="text-sm font-black" style={{color:currentReview.grade.benar?'#34D399':'#F87171',fontFamily:'Orbitron'}}>
                        {currentReview.grade.hit}/{currentReview.grade.total}
                      </span>
                    </div>
                  </div>
                  <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">
                    {currentReview.jawaban || <span className="italic text-white/50">Tidak dijawab</span>}
                  </p>
                </div>
                <div className="rounded-2xl p-4" style={{background:'#1E3A5F22',border:'1px solid #818CF844'}}>
                  <p className="text-sm font-black uppercase tracking-wider mb-2" style={{color:'#818CF8',fontFamily:'Orbitron'}}>Kunci Jawaban</p>
                  <p className="text-white text-lg leading-relaxed">{currentReview.soal.kunci}</p>
                </div>
                <div className="rounded-2xl p-4" style={{background:'#13113A',border:'1px solid #7c3aed11'}}>
                  <p className="text-sm font-black uppercase tracking-wider mb-2" style={{color:'#a78bfa',fontFamily:'Orbitron'}}>Penjelasan Penilaian</p>
                  <p className="text-white/80 text-sm leading-relaxed mb-2">
                    Sistem mendeteksi <span className="font-bold" style={{color:'#a78bfa'}}>{currentReview.grade.hit} dari {currentReview.grade.total}</span> konsep kunci dalam jawabanmu
                    ({Math.round(currentReview.grade.skor*100)}% kecocokan).
                  </p>
                  {currentReview.grade.benar ? (
                    <div className="flex items-start gap-2 p-2 rounded-xl" style={{background:'#05966911',border:'1px solid #34D39922'}}>
                      <span className="text-sm">✅</span>
                      <p className="text-sm text-white/90">Jawabanmu mencakup ide/konsep utama yang diminta. Kalimat berbeda tapi makna tepat tetap diterima.</p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 p-2 rounded-xl" style={{background:'#7f1d1d11',border:'1px solid #F8717122'}}>
                      <span className="text-sm">💡</span>
                      <p className="text-sm text-white/90">Coba tambahkan lebih banyak poin dari kunci jawaban. Kamu tidak perlu menyalin persis — cukup sampaikan konsep yang sama dengan kata-katamu sendiri.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 px-6 py-4 flex gap-3" style={{borderTop:'1px solid #7c3aed1a'}}>
              <button onClick={()=>setReviewIdx(i=>Math.max(0,i-1))} disabled={reviewIdx===0}
                className="nav-btn glow-btn px-5 py-2.5 rounded-xl text-white font-bold text-base"
                style={{background:'#1E1B4B',border:'1px solid #7c3aed33',fontFamily:'Rajdhani'}}>
                ← Sebelumnya
              </button>
              <button onClick={()=>setReviewIdx(i=>Math.min(TOTAL_ESAI-1,i+1))} disabled={reviewIdx===TOTAL_ESAI-1}
                className="nav-btn glow-btn flex-1 py-2.5 rounded-xl text-white font-black text-base"
                style={{background:'linear-gradient(135deg,#7c3aed,#5b21b6)',fontFamily:'Orbitron'}}>
                Berikutnya →
              </button>
              <button onClick={()=>setReviewOpen(false)}
                className="nav-btn glow-btn px-5 py-2.5 rounded-xl text-white font-bold text-base"
                style={{background:'#13113A',border:'1px solid #7c3aed22',fontFamily:'Rajdhani'}}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ MODAL KONFIRMASI KELUAR ══ */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{background:'rgba(5,4,22,0.92)',backdropFilter:'blur(16px)'}}
          onClick={()=>setShowExitConfirm(false)}>
          <div className="modal-in w-full max-w-sm rounded-3xl overflow-hidden"
            style={{background:'linear-gradient(135deg,#13113A,#1a1740)',border:'1px solid #F8717155',boxShadow:'0 0 60px #F8717122'}}
            onClick={e=>e.stopPropagation()}>
            <div className="h-0.5 w-full" style={{background:'linear-gradient(90deg,#7c3aed,#F87171,#7c3aed)'}}/>
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">⚠️</div>
              <p className="text-white font-black text-base uppercase tracking-wider mb-2" style={{fontFamily:'Orbitron'}}>
                Akhiri Evaluasi?
              </p>
              <p className="text-white/80 text-base leading-relaxed mb-6" style={{fontFamily:'Rajdhani'}}>
                Progress jawabanmu akan hilang dan evaluasi tidak dianggap selesai. Yakin ingin keluar?
              </p>
              <div className="flex gap-3">
                <button onClick={()=>setShowExitConfirm(false)}
                  className="nav-btn glow-btn flex-1 py-3 rounded-2xl text-white font-black text-base"
                  style={{background:'#1E1B4B',border:'1px solid #7c3aed44',fontFamily:'Orbitron'}}>
                  BATAL
                </button>
                <button onClick={confirmExit}
                  className="nav-btn glow-btn flex-1 py-3 rounded-2xl text-white font-black text-base"
                  style={{background:'linear-gradient(135deg,#dc2626,#991b1b)',boxShadow:'0 0 20px #F8717133',fontFamily:'Orbitron'}}>
                  YA, KELUAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default Evaluation