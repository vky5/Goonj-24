import aerocraft from "../assets/Images/Registration_Rocket.webp";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie} from "../utils/Cookies";
import LoggedContext from "../main";
import { VKYRequest } from "../utils/requests";

import { UserContext } from "../main";

import desktop_bg_image from "../assets/Images/RegSuccess_Astro.webp";


const indianStates = [
  {
    state: "Andra Pradesh",
    district:["Anantapur","Chittoor","East Godavari","Guntur","Kadapa","Krishna","Kurnool","Prakasam","Nellore","Srikakulam","Visakhapatnam","Vizianagaram","West Godavari"],
    college:[]

  },
  {
    state: "ArunachalPradesh",
    district: ["Anjaw","Changlang","Dibang Valley","East Kameng","East Siang","Kra Daadi","Kurung Kumey","Lohit","Longding","Lower Dibang Valley","Lower Subansiri","Namsai","Papum Pare","Siang","Tawang","Tirap","Upper Siang","Upper Subansiri","West Kameng","West Siang","Itanagar"],
    college:[]

  },
  {
    state: "Assam",
    district:["Baksa","Barpeta","Biswanath","Bongaigaon","Cachar","Charaideo","Chirang","Darrang","Dhemaji","Dhubri","Dibrugarh","Goalpara","Golaghat","Hailakandi","Hojai","Jorhat","Kamrup Metropolitan","Kamrup (Rural)","Karbi Anglong","Karimganj","Kokrajhar","Lakhimpur","Majuli","Morigaon","Nagaon","Nalbari","Dima Hasao","Sivasagar","Sonitpur","South Salmara Mankachar","Tinsukia","Udalguri","West Karbi Anglong"],
    college:[]

  },
  {
    state: "Bihar",
    district:["Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur","Bhojpur","Buxar","Darbhanga","East Champaran","Gaya","Gopalganj","Jamui","Jehanabad","Kaimur","Katihar","Khagaria","Kishanganj","Lakhisarai","Madhepura","Madhubani","Munger","Muzaffarpur","Nalanda","Nawada","Patna","Purnia","Rohtas","Saharsa","Samastipur","Saran","Sheikhpura","Sheohar","Sitamarhi","Siwan","Supaul","Vaishali","West Champaran"],
    college:[]
  },
  {
    state: "Chhattisgarh",
    district:["Balod","Baloda Bazar","Balrampur","Bastar","Bemetara","Bijapur","Bilaspur","Dantewada","Dhamtari","Durg","Gariaband","Janjgir Champa","Jashpur","Kabirdham","Kanker","Kondagaon","Korba","Koriya","Mahasamund","Mungeli","Narayanpur","Raigarh","Raipur","Rajnandgaon","Sukma","Surajpur","Surguja"],
    college:[]

  },
  {
    state: "Goa",
    district: ["North Goa","South Goa"],
    college:[]


  },
  {
    state: "Gujarat",
    district:["Ahmedabad","Amreli","Anand","Aravalli","Banaskantha","Bharuch","Bhavnagar","Botad","Chhota Udaipur","Dahod","Dang","Devbhoomi Dwarka","Gandhinagar","Gir Somnath","Jamnagar","Junagadh","Kheda","Kutch","Mahisagar","Mehsana","Morbi","Narmada","Navsari","Panchmahal","Patan","Porbandar","Rajkot","Sabarkantha","Surat","Surendranagar","Tapi","Vadodara","Valsad"],
    college:[]
  },
  {
    state: "Haryana",
    district:["Ambala","Bhiwani","Charkhi Dadri","Faridabad","Fatehabad","Gurugram","Hisar","Jhajjar","Jind","Kaithal","Karnal","Kurukshetra","Mahendragarh","Mewat","Palwal","Panchkula","Panipat","Rewari","Rohtak","Sirsa","Sonipat","Yamunanagar"],
    college:[]
  },
  {
    state: "Himachal Pradesh",
    district:["Bilaspur","Chamba","Hamirpur","Kangra","Kinnaur","Kullu","Lahaul Spiti","Mandi","Shimla","Sirmaur","Solan","Una"],
    college:[]

  },
  {
    state: "Jammu Kashmir",
    district:["Anantnag","Bandipora","Baramulla","Budgam","Doda","Ganderbal","Jammu","Kargil","Kathua","Kishtwar","Kulgam","Kupwara","Leh","Poonch","Pulwama","Rajouri","Ramban","Reasi","Samba","Shopian","Srinagar","Udhampur"],
    college:[]
  },
  {
    state: "Jharkhand",
    district:["Bokaro","Chatra","Deoghar","Dhanbad","Dumka","East Singhbhum","Garhwa","Giridih","Godda","Gumla","Hazaribagh","Jamtara","Khunti","Koderma","Latehar","Lohardaga","Pakur","Palamu","Ramgarh","Ranchi","Sahebganj","Seraikela Kharsawan","Simdega","West Singhbhum"],
    college:[]
  },
  {
    state: "Karnataka",
    district: ["Bagalkot","Bangalore Rural","Bangalore Urban","Belgaum","Bellary","Bidar","Vijayapura","Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga","Dakshina Kannada","Davanagere","Dharwad","Gadag","Gulbarga","Hassan","Haveri","Kodagu","Kolar","Koppal","Mandya","Mysore","Raichur","Ramanagara","Shimoga","Tumkur","Udupi","Uttara Kannada","Yadgir"],
    college:[]
  },
  {
    state: "Kerala",
    district:["Alappuzha","Ernakulam","Idukki","Kannur","Kasaragod","Kollam","Kottayam","Kozhikode","Malappuram","Palakkad","Pathanamthitta","Thiruvananthapuram","Thrissur","Wayanad"],
    college:[]

  },
  {
    state: "Madhya Pradesh",
    district:["Agar Malwa","Alirajpur","Anuppur","Ashoknagar","Balaghat","Barwani","Betul","Bhind","Bhopal","Burhanpur","Chhatarpur","Chhindwara","Damoh","Datia","Dewas","Dhar","Dindori","Guna","Gwalior","Harda","Hoshangabad","Indore","Jabalpur","Jhabua","Katni","Khandwa","Khargone","Mandla","Mandsaur","Morena","Narsinghpur","Neemuch","Panna","Raisen","Rajgarh","Ratlam","Rewa","Sagar","Satna",
    "Sehore","Seoni","Shahdol","Shajapur","Sheopur","Shivpuri","Sidhi","Singrauli","Tikamgarh","Ujjain","Umaria","Vidisha"],
    college:[]
    
  },
  {
    state: "Maharashtra",
    district:["Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana","Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna","Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded","Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad","Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha","Washim","Yavatmal"],
    college:[]
  },
  {
    state: "Manipur",
    district:["Bishnupur","Chandel","Churachandpur","Imphal East","Imphal West","Jiribam","Kakching","Kamjong","Kangpokpi","Noney","Pherzawl","Senapati","Tamenglong","Tengnoupal","Thoubal","Ukhrul"],
    college:[]

  },
  {
    state: "Meghalaya",
    district:["East Garo Hills","East Jaintia Hills","East Khasi Hills","North Garo Hills","Ri Bhoi","South Garo Hills","South West Garo Hills","South West Khasi Hills","West Garo Hills","West Jaintia Hills","West Khasi Hills"],
    college:[]
  },
  {
    state: "Mizoram",
    district:["Aizawl","Champhai","Kolasib","Lawngtlai","Lunglei","Mamit","Saiha","Serchhip","Aizawl","Champhai","Kolasib","Lawngtlai","Lunglei","Mamit","Saiha","Serchhip"],
    college:[]

  },
  {
    state: "Nagaland",
    district:["Dimapur","Kiphire","Kohima","Longleng","Mokokchung","Mon","Peren","Phek","Tuensang","Wokha","Zunheboto"],
    college:[]

  },
  {
    state: "Odisha",
    district:["Angul","Balangir","Balasore","Bargarh","Bhadrak","Boudh","Cuttack","Debagarh","Dhenkanal","Gajapati","Ganjam","Jagatsinghpur","Jajpur","Jharsuguda","Kalahandi","Kandhamal","Kendrapara","Kendujhar","Khordha","Koraput","Malkangiri","Mayurbhanj","Nabarangpur","Nayagarh","Nuapada","Puri","Rayagada","Sambalpur","Subarnapur","Sundergarh"],
    college:[]

  },
  {
    state: "Punjab",
    district:["Amritsar","Barnala","Bathinda","Faridkot","Fatehgarh Sahib","Fazilka","Firozpur","Gurdaspur","Hoshiarpur","Jalandhar","Kapurthala","Ludhiana","Mansa","Moga","Mohali","Muktsar","Pathankot","Patiala","Rupnagar","Sangrur","Shaheed Bhagat Singh Nagar","Tarn Taran"],
    college:[]
  },
  {
    state: "Punjab",
    district:["Ajmer","Alwar","Banswara","Baran","Barmer","Bharatpur","Bhilwara","Bikaner","Bundi","Chittorgarh","Churu","Dausa","Dholpur","Dungarpur","Ganganagar","Hanumangarh","Jaipur","Jaisalmer","Jalore","Jhalawar","Jhunjhunu","Jodhpur","Karauli","Kota","Nagaur","Pali","Pratapgarh","Rajsamand","Sawai Madhopur","Sikar","Sirohi","Tonk","Udaipur"],
    college:[]

  },
  {
    state: "Sikkim",
    district:["East Sikkim","North Sikkim","South Sikkim","West Sikkim"],
    college:[]

  },
  {
    state: "Tamil Nadu",
    district:["Ariyalur","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kanchipuram","Kanyakumari","Karur","Krishnagiri","Madurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram","Salem","Sivaganga","Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar"],
    college:[]
  },
  {
    state: "Telangana",
    district: ["Adilabad","Bhadradri Kothagudem","Hyderabad","Jagtial","Jangaon","Jayashankar","Jogulamba","Kamareddy","Karimnagar","Khammam","Komaram Bheem","Mahabubabad","Mahbubnagar","Mancherial","Medak","Medchal","Nagarkurnool","Nalgonda","Nirmal","Nizamabad","Peddapalli","Rajanna Sircilla","Ranga Reddy","Sangareddy","Siddipet","Suryapet","Vikarabad","Wanaparthy","Warangal Rural","Warangal Urban","Yadadri Bhuvanagiri"],
    college:[]

  },
  {
    state: "Tripura",
    district:["Dhalai","Gomati","Khowai","North Tripura","Sepahijala","South Tripura","Unakoti","West Tripura"],
    college:[]
  },
  {
    state: "Uttar Pradesh",
    district:["Agra","Aligarh","Allahabad","Ambedkar Nagar","Amethi","Amroha","Auraiya","Azamgarh","Baghpat","Bahraich","Ballia","Balrampur","Banda","Barabanki","Bareilly","Basti","Bhadohi","Bijnor","Budaun","Bulandshahr","Chandauli","Chitrakoot","Deoria","Etah","Etawah","Faizabad","Farrukhabad","Fatehpur","Firozabad","Gautam Buddha Nagar","Ghaziabad","Ghazipur","Gonda","Gorakhpur","Hamirpur","Hapur","Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur Dehat","Kanpur Nagar","Kasganj","Kaushambi","Kheri","Kushinagar","Lalitpur","Lucknow","Maharajganj","Mahoba","Mainpuri","Mathura","Mau","Meerut","Mirzapur","Moradabad","Muzaffarnagar","Pilibhit","Pratapgarh","Raebareli","Rampur","Saharanpur","Sambhal","Sant Kabir Nagar","Shahjahanpur","Shamli","Shravasti","Siddharthnagar","Sitapur","Sonbhadra","Sultanpur","Unnao","Varanasi"],
    college:[]

  },
  {
    state: "Uttarakhand",
    district: ["Almora","Bageshwar","Chamoli","Champawat","Dehradun","Haridwar","Nainital","Pauri","Pithoragarh","Rudraprayag","Tehri","Udham Singh Nagar","Uttarkashi"],    
    college:[
      "Forest Survey of India (Id: C-44369)",
      "G.B. Pant Institute of Himalayan Environment & Development (Id: C-44358)",
      "Indian Institute of Remote Sensing (Id: C-44363)",
      "Wildlife Institute of India (Id: C-44360)",
      "College of Agribusiness Management (Id: C-16665)",
      "College of Agriculture (Id: C-16666)",
      "College of Fisheries (Id: C-16668)",
      "College of Home Science (Id: C-16672)",
      "College of Post-Graduate Studies (Id: C-16671)",
      "College of Technology (Id: C-16673)",
      "College of Veterinary & Animal Sciences (Id: C-16667)",
      "Colloge of Basic Sciences & Humanities (Id: C-16670)",
      "Academy for management Studies, Nanda Ki Chowki, Premnagar, Dehradun (Id: C-24640)",
      "Advance Institute of Science and Technology,Dehradun (Id: C-24704)",
      "Alpine Institute of Paramedical Science, Nanda Ki Chowki, Prem Nagar , Dehradun (Id: C-24535)",
      "Anusuya Prasad Bahuguna Govt. P.G College, Agastyamuni (Id: C-24667)",
      "Arihant College of Education, Vill- Shantarshah,P.O-Daulatpur,Via- Badharabad, Haridwar (Id: C-24602)",
      "Baba Farid Institute of Technology, Dehradun (Id: C-24558)",
      "Baburam Degree College, Saliyar, Roorkee (Id: C-24534)",
      "Bal Ganga Degree College, Sendul, Kemar (Id: C-24651)",
      "Beehive College of Advance Studies, Beehive City Central Hope Town, Selaqui,Chakrata Road, Dehradun (Id: C-24666)",
      "Bishamber Sahay Degree College,Roorkee (Id: C-24603)",
      "Bishamber Sahay Law College, Roorkee (Id: C-24568)",
      "Bishambher Sahay B.Ed. Institute, Roorkee (Id: C-24577)",
      "B.S.M B.Ed College, Roorkee (Id: C-24525)",
      "B.S.M College, Roorkee (Id: C-24607)",
      "B.S.M Law College, Roorkee (Id: C-24604)",
      "Byapar Mandal Kanya Degree College, Manglore (Id: C-24625)",
      "Chandrawati Tiwari Law College, Kotdwar (Id: C-24636)",
      "Charat Niketan Vishwa Bharti, Jhabredi, Haridwar (Id: C-24641)",
      "Chaudhari Bharat Singh Anglovedic Boys Degree College, Jhabreda, Haridwar (Id: C-24574)",
      "Chinmaya Degree College, Roorkee (Id: C-24703)",
      "Chip Infonet Institute of Management and Technology, 7 Cement Road, Near D.B.S. P.G College, KaranpurDehradun (Id: C-24531)",
      "C.N.I Degree College, Dehradun (Id: C-24669)",
      "College of Education, Roorkee-Haridwar Road,Shantarshah, Haridwar (Id: C-24533)",
      "Combined P.G Institute of Medical Sciences and Research,4-B Race Course, Dehradun (Id: C-24548)",
      "D.A.A.S College,Dehradun (Id: C-24583)",
      "D.A.V.P.G College, Dehradun (Id: C-24695)",
      "Dayanand Womens Training College, Dehradun (Id: C-24589)",
      "D.B.S. P.G College, Dehradun (Id: C-24615)",
      "D.D Institute of Advance Studies , 25 Nimbuwala,Garhi Cantt, Dehradun (Id: C-24528)",
      "Devbhoomi institute of Allied Sciences, Dehradun (Id: C-24698)",
      "Devbhoomi Institute of Education Science and Technology, Dehradun (Id: C-24601)",
      "Dhanauri College, Dhanauri, Roorkee (Id: C-24573)",
      "Dolphin Institute of Biomedical Natural Sciences, Dehradun (Id: C-24587)",
      "Doon College of Agriculture Science and Technology, Dehradun (Id: C-24664)",
      "Doon Ghati College of Professional Education, Doiwala, Dehradun (Id: C-24668)",
      "Doon Ghati College of Professional Education, Premnagar Bazaar Doiwala, Dehradun (Id: C-24672)",
      "Doon Institute of Education, Rishikesh-Haridwar Highway,Shyampur, Rishikesh (Id: C-24579)",
      "Doon Institute of Management and Research, Shyampur,Dehradun (Id: C-24586)",
      "Doon Institute of Teachers Training, 14 Subhash Road, Abhishek Tower, Dehradun (Id: C-24616)",
      "Doon Paramedical College,28, Chakrata Road, Dehradun (Id: C-24544)",
      "Doon P.G College of Agricultural Science and Technology, Dehradun (Id: C-24581)",
      "Doon Valley College of Education, Thakurpur,P.O-Premnagar, Dehradun (Id: C-24677)",
      "Dronacharya Institute of Teacher Education, VPO- Dharamwala, Vikasnagar, Shimla bypass Road, Dehradun (Id: C-24557)",
      "Drona College of Management and Technical Education, 49, Subhash Road, Dehradun (Id: C-24553)",
      "Drona's College of Management and Technical Education, 59, Subhash Road, Mussoorie (Id: C-24555)",
      "Dr. Pitambar Datt Barthwal Himalaya Government PG Degree College,Kotdwar (Id: C-24549)",
      "Dr. Sushila Tiwari College of Advance Studies, 8 Garhi Cantt, Tapkeshwar Mahadev Road, Dehradun (Id: C-24529)",
      "Garg U.G. Degree College, Laksar (Id: C-24629)",
      "Gayatri College of Biomedical Sciences, Dehradun (Id: C-24599)",
      "Govt. Degree College, Agrora (Id: C-24570)",
      "Govt. Degree College, Barkot (Id: C-24585)",
      "Govt. Degree College, Bedikhal (Id: C-24520)",
      "Govt. Degree College, Chaubattakhal (Id: C-24680)",
      "Govt. Degree College, Chinyalisaur (Id: C-24611)",
      "Govt. Degree College, Dakpathar, Vikas Nagar (Id: C-24547)",
      "Govt.Degree College, Doiwala, Dehradun (Id: C-24628)",
      "Govt. Degree College, Gairsain (Id: C-24556)",
      "Govt. Degree College, Jaiharikhal,Lansdown (Id: C-24614)",
      "Govt. Degree College, Jakholi (Id: C-24634)",
      "Govt. Degree College, Joshimath (Id: C-24690)",
      "Govt. Degree College, Karanprayag (Id: C-24701)",
      "Govt. Degree College, Laksar, Haridwar (Id: C-24605)",
      "Govt. Degree College, Lambgaon (Id: C-24693)",
      "Govt. Degree College, Naikhari, Chandrabadni (Id: C-24623)",
      "Govt. Degree College,Nainbagh (Id: C-24537)",
      "Govt. Degree College, Nainidanda, Pauri (Id: C-24622)",
      "Govt. Degree College, Narendranagar (Id: C-24584)",
      "Govt. Degree College, Pokhal (Id: C-24655)",
      "Govt. Degree College, Pokhri, Nagnath (Id: C-24707)",
      "Govt. Degree College, Purola (Id: C-24539)",
      "Govt. Degree College, Rikhnikhal (Id: C-24627)",
      "Govt. Degree College, Rudraprayag (Id: C-24706)",
      "Govt. Degree College, Satpuli (Id: C-24519)",
      "Govt. Degree College, Talwari (Id: C-24563)",
      "Govt. Degree College, Thalisain (Id: C-24551)",
      "Govt. Degree College, Thatyud (Id: C-24657)",
      "Govt. Degree College, Tyuni (Id: C-24689)",
      "Govt. Govind Ballabh Engineering College, Gurdhauri (Id: C-24676)",
      "Govt. Law College, Gopeshwar (Id: C-24678)",
      "Govt. P.G Degree College, Gopeshwar (Id: C-24522)",
      "Govt. P.G Degree College, New Tehri (Id: C-24648)",
      "Govt.PG Degree College, Rishikesh, Dehradun (Id: C-24679)",
      "Govt. P.G Degree College, Uttarkashi (Id: C-24609)",
      "Graphic Era Institute of Technology,566/6 Bell Road Clamain Town, Dehradun (Id: C-24606)",
      "G.R.D Girls Degree College, Niranjanpur, Near Police Line, Patel Nagar, Dehradun (Id: C-24696)",
      "Gurukul Degree (B.Ed) College, Haridwar (Id: C-24675)",
      "Gurukul Degree college, Haridwar (Id: C-24700)",
      "Gurukul Govt. Ayurvedic Degree College Gurukul Kangri, Haridwar (Id: C-24592)",
      "Gyani Inder Singh Institute of Professional Sudies, Mussoorie Diversion Road, P.Box No.260, Dehradun (Id: C-24699)",
      "Haridwar Education College, Kanya Gurukul Campus, Krishna Nagar, Haridwar (Id: C-24688)",
      "Harsh Vidhya Mandir Degree College, Rayasi, Haridwar (Id: C-24691)",
      "Himalayan Ayurvedic Medical College and Hospital, Shyampur, Rishikesh (Id: C-24684)",
      "Himalayan College, Himalayan Charitable Trust, Shiv Complex, Civil Line, Roorkee (Id: C-24546)",
      "Himalayan College of Nursing Dehradun (Id: C-24543)",
      "Himalayan Doon Academy, Bhagwanpur Gagalhedi Road, Sikandarpur, Roorkee (Id: C-24597)",
      "Himalayan Institute of Medical Sciences, Swami Ram Nagar, Doiwala, Dehradun (Id: C-24692)",
      "Himalayan institute of Paramedical Sciences, Jollygrant, Dehradun (Id: C-24646)",
      "Himalayan Institute of Technology,D-31/32, Nehru Colony Dehradun (Id: C-24694)",
      "Himgiri Education Institute, Sikarpur, Roorkee (Id: C-24673)",
      "Indian Military Academy, Dehradun (Id: C-24705)",
      "Institute for Education Leadership, 25, Nimbuwala, Garhi Cantt, Dehradun (Id: C-24521)",
      "Institute of Hotel Management Studies, Kotdwar (Id: C-24590)",
      "Institute of Management Studies, Civil Line, Roorkee, Haridwar (Id: C-24661)",
      "Institute of Management Studies, Makkawala, Mussoorie Diversion Road, Dehradun (Id: C-24686)",
      "Institute of Media Management and Technology, Shimla Bypass Road,Mehuwala, Dehradun (Id: C-24596)",
      "Institute of Paramedical and Allied Science, Doon Cambridge Society, Race Course, Dehradun (Id: C-24647)",
      "Institute of Paramedical science, Dehradun (Id: C-24523)",
      "Institute of Progressive Studies and Development, Roorkee (Id: C-24687)",
      "Institute of Technology and Management, 60 Chakrata Road,Dehradun (Id: C-24560)",
      "I.T.B.P. Academy, Mussoorie (Id: C-24685)",
      "K.L.D.A.V College, Roorkee (Id: C-24652)",
      "Kukreja Institute of Teachers Education, Dehradun (Id: C-24656)",
      "Kulnary College of Hotel Management and Catering Technology, Dehradun (Id: C-24572)",
      "Kunti Naman Institute of Pharma Technology and Sciences, Haridwar (Id: C-24594)",
      "Law College Dehradun, P.O- Chandanbadi, Premnagar, Dehradun (Id: C-24550)",
      "Libra College of Law, Dehradun (Id: C-24610)",
      "Mahayogi Gurugorakhnath Degree College,Bithyani, Yamkeshwar (Id: C-24561)",
      "Malini Valley College of Education, Shirrajpur, Kotdwar (Id: C-24632)",
      "Manav Bharati, D Block, Nehru Colony, Dehradun (Id: C-24635)",
      "Methodist Girls Degree College, Civil Line, Roorkee (Id: C-24633)",
      "M.K.P.P.G College, Dehradun (Id: C-24639)",
      "M.M P.G College Satikund, Kankhal, Haridwar (Id: C-24559)",
      "Modern Institute of Technology and BBA, Dhalwala, Rishikesh (Id: C-24620)",
      "Modern Institute of Technology, Dhalwala, Rishikesh (Id: C-24681)",
      "Motherwood Institute of Management and Technology, E 36 Industrial Area, Near Upper Road, Haridwar (Id: C-24613)",
      "Motherwood Institute of Management and Technology,Haridwar (Id: C-24618)",
      "M.S Garg B.Ed. College Laksar, Roorkee (Id: C-24566)",
      "Municipal P.G Degree College Mussoorie (Id: C-24593)",
      "Mussoorie Management Institute( B.Ed), Campty Road, Mussoorie (Id: C-24621)",
      "Mussoorie Management Institute, Campty Road, Mussoorie (Id: C-24642)",
      "Mussorie Institute of Education, 42 Barloganj, Mussorie (Id: C-24564)",
      "Nalanda College of Education,SC-1, C-28, Defence Colony, Dehradun (Id: C-24540)",
      "Narayan Swami Hospital and Dental College, Dehradun (Id: C-24569)",
      "Narayan Swami Institute of Medical Sciences and Research, Dehradun (Id: C-24658)",
      "Narayan Swami Uttaranchal College of Education, Nanda Ki Chowki, Dehradun (Id: C-24659)",
      "Narendra Welfare Trust College,59 Gandhi Road, Dehradun (Id: C-24643)",
      "National Chetna College of Teachers Education, Dehradun (Id: C-24591)",
      "National Institute for the Visually Handicapped, 116, Rajpur Road, Dehradun (Id: C-24674)",
      "Nimbus Academy of Management, Jhajhara, Dehradun (Id: C-24612)",
      "Om Biosciences and Pharma College, P.O- Bharapur, Haridwar-Roorkee National Highway, Roorkee (Id: C-24526)",
      "Omkarnand Saraswati Degree College, Devprayag (Id: C-24552)",
      "Pandit Purnanand Tiwari Law College, Idgah Road, Jwalapur,Haridwar (Id: C-24538)",
      "Pestle Weed College of information Technology, Technological Park,OK Hill,Dehradun (Id: C-24562)",
      "Petrisian College of Education, St. Joseph Academy, 34 Rajpur Road, Dehradun (Id: C-24682)",
      "Prithviraj Chauhan Degree college, Rohalaki, Kishanpur (Id: C-24617)",
      "Raath Degree (B.Ed) College, Paithani (Id: C-24671)",
      "Raath Degree College, Paithani (Id: C-24644)",
      "R.C . P.G College and Allied Sciences,Roorkee (Id: C-24645)",
      "Rishikul Govt. Ayurvedic Degree College, Haridwar (Id: C-24653)",
      "R.M.P Degree College, Narsan (Id: C-24532)",
      "Roorkee Adventist College, Roorkee (Id: C-24542)",
      "Roorkee Degree College, Dhanauri (Id: C-24626)",
      "Roorkee Institute of Science, Roorkee (Id: C-24541)",
      "Sai Institute of Paramedical and Allied Science, 26/26 A, Rajpur Road, Dehradun (Id: C-24662)",
      "Samrat Prithviraj Chauhan Degree College, Rohalaki Kishanpur, Haridwar (Id: C-24580)",
      "Sanskriti Institute of Advance Studies, Vill.- Nasirpur, Tehsil-Roorkee, Haridwar (Id: C-24619)",
      "Sardar Bhagwan Singh Memorial P.G Institute of Biomedical Sciences and Research, Dehradun (Id: C-24530)",
      "Seema Dental College and Hospital,Veerbhadra Road, Rishikesh (Id: C-24702)",
      "Shakuntala Devi Institute of Teachers Education,88 Adarsh Vihar, Karki Road, Dehradun (Id: C-24588)",
      "Sheetal College of Biomedical Sciences, Ranipokhari, Dehradun (Id: C-24670)",
      "Shri Guru Ram Rai P.G College, Dehradun (Id: C-24576)",
      "Shrishti Institute of Education, Iqbalpur Road, Asafnagar, Shantipuram, Roorkee (Id: C-24608)",
      "Sita Devi Memorial institute of Education and Technology, Idgah Road, Jwalapur, Haridwar (Id: C-24697)",
      "S.M.J.N P.G college, Govindpuri, Haridwar (Id: C-24575)",
      "Smt.Manjira Devi Shikshan avam Prasikshan Samiti, Hitanu Dhanari, Uttarkashi (Id: C-24660)",
      "S.P Memorial B.Ed. College, Bhaktiyana, Srinagar (Id: C-24595)",
      "Sri Gangadhar Maithani Govt. Degree College,Guptakashi (Id: C-24650)",
      "Sri Gulab Singh Govt. Degree College, Chakrata, Dehradun (Id: C-24545)",
      "Sri Guru Ram Rai Institute of Medical Sciences, Dehradun (Id: C-24631)",
      "Sri Guru Ram Rai Institute of Technology, Patel Nagar, Dehradun (Id: C-24578)",
      "Sri Guru Ram Rai P.G Degree College,Dehradun (Id: C-24527)",
      "S.S.D.P.C Girls Degree College, Roorkee (Id: C-24565)",
      "Sushana Methodist Girls B.Ed College, Civil Line, Roorkee (Id: C-24567)",
      "Tanisque College of Education,59/3 Rajpur Road, Dehradun (Id: C-24582)",
      "Times Institute of Philosphy and Science, Dehradun (Id: C-24624)",
      "Trinity College of Education, Dehradun (Id: C-24524)",
      "Unison School of Law,21, Cantt Road, Dehradun (Id: C-24665)",
      "Uttaranchal Ayurvedic College, Dehradun (Id: C-24554)",
      "Uttaranchal College of Education, Sewalakhurd, Saharanpur Road, Dehradun (Id: C-24637)",
      "Uttaranchal College of Science and Technology, Jakhan, Johari, Rajpur Road, Dehradun (Id: C-24649)",
      "Uttaranchal College of Technology and Biomedical Science, Saharanpur Road, Dehradun (Id: C-24683)",
      "Uttaranchal Dental Medical and Research Institute, Dehradun (Id: C-24654)",
      "Uttaranchal Institute of Management, Dehradun (Id: C-24536)",
      "V M K DEGREE COLLEGE, MANGLOUR (Id: C-47583)",
      "Himalayan Institute of Medical Sciences (Id: C-10213)",
      "Army Cadet College Wing (ACC), Indian Military Academy (Id: C-8326)",
      "Amrapali Institute of Computer Application, Haldwani (Id: C-21879)",
      "Arya Govt.Girls Degree College Almora (Id: C-21914)",
      "Birla Institute of Applied Sciences, Bhimtal (Id: C-21932)",
      "B.S.V. Govt.Girls Degree College, Jaspur (Id: C-21880)",
      "Chanakya Law College, Rudrapur (Id: C-27618)",
      "Chandola Homeopathic Medical College, Rudrapur (Id: C-21876)",
      "Chandrawati Tiwari Govt.Girls Degree College, kashipur (Id: C-21877)",
      "Dev Bhumi Institue of Professional Education, Rudrapur (Id: C-21935)",
      "Dewbhomi College of Education, Chonabhata Road, Banbasa (Id: C-21886)",
      "Droan B.Ed College for Woman, Sunderpur Road, Dineshpur, Rudrapur (Id: C-27612)",
      "Droan B.Ed College, Gadarpur Road Rudrapur (Id: C-27617)",
      "Droan College of Education and Technology, Dineshpur Road, Rudrapur (Id: C-27611)",
      "Dr. Shusheela Tiwari Degree College, Sitarganj (Id: C-21888)",
      "DSB Campus (Id: C-21896)",
      "Ganna Krishak Govt.Girls Degree College, Kichha (Id: C-21927)",
      "Govt. Degree College, Bhikiyasen (Id: C-21885)",
      "Govt. Degree College, kanda (Id: C-21875)",
      "Govt. Degree College, Kotabag (Id: C-21931)",
      "Govt. Girls Degree College, Haldwani (Id: C-22457)",
      "Govt. P G College, Bageshwar (Id: C-21928)",
      "Govt. P G College, Bajpur (Id: C-21917)",
      "Govt. P G College, Baluwakot (Id: C-21926)",
      "Govt. P G College, Berinag (Id: C-21878)",
      "Govt. P G College, Champawat (Id: C-21890)",
      "Govt. P G College,Chaukhutiya (Id: C-21912)",
      "Govt. P G College, Didihaat, Narayan Nagar (Id: C-21924)",
      "Govt. P G College, Dwarahat (Id: C-21874)",
      "Govt. P G College, Gangolihat (Id: C-21921)",
      "Govt. P G College, Garudabanj (Id: C-21894)",
      "Govt. P G College, Garud, Bageshwar (Id: C-21883)",
      "Govt. P G College, Jaintee (Id: C-21887)",
      "Govt. P G College, Kapkot (Id: C-21918)",
      "Govt. P G College, kashipur (Id: C-21911)",
      "Govt. P G College, Khateema (Id: C-21919)",
      "Govt. P G College, Lohaghat (Id: C-21898)",
      "Govt. P G College, Manila (Id: C-21925)",
      "Govt. P G College, Munsyari (Id: C-21882)",
      "Govt. P G College, Pithoragarh (Id: C-21903)",
      "Govt. P G College, Ramnagar (Id: C-21937)",
      "Govt. P G College, Ranikhet (Id: C-21936)",
      "Govt. P G College, Rudrapur (Id: C-21906)",
      "Govt. P G College, Someshwar (Id: C-21909)",
      "Govt. P G College, Syalde (Id: C-21893)",
      "Govt. P G College, Tanakpur (Id: C-21910)",
      "Gurunanak govt. Girls Degree College, Nanakmatta (Id: C-21913)",
      "Himalayan Adhyan Kendra, Pithoragarh (Id: C-21908)",
      "Infusion College of Science and Technology, Target Classes Amrawati Colony , Haldwani (Id: C-21900)",
      "Inspirational College of Teachers Education, Kathgodam (Id: C-21907)",
      "Institute of Management and Technology, Kashipur (Id: C-21933)",
      "Jai Arihant Academic Institute Haldwani (Id: C-21889)",
      "Kumaun Engineering College, Dwarahat (Id: C-21881)",
      "Kumaun Institute of Information technology, Kathgodam (Id: C-21934)",
      "Lalbahadur Shastri Takneki Shiksha Sasthan, Haldochaud (Id: C-21904)",
      "Mariyam Institute of Higher Studies and Allied Courses, Haldwani (Id: C-21895)",
      "M B Govt. P.G. Coleege, Haldwani (Id: C-21891)",
      "Nansi Institute of Management, Jyolikot (Id: C-21920)",
      "Pal College of Technology and Management, Haldwani (Id: C-21916)",
      "PRESENTATION COLLEGE OF TEACHER EDUCATION, DAMUADHUNGA, KATHGODAM, HALDWANI (Id: C-50274)",
      "Pt. Poornanad Govt. P G College, Dosapani, Chaukhuta (Id: C-21873)",
      "Salt Institute of Technology and Management, Salt (Id: C-21922)",
      "Saraswati Institute of Management and Technology, Kashipur Road Rudrapur (Id: C-21923)",
      "Shri Guru Nanak Degree College, Preet Vihar Colony, Rudrapur (Id: C-21905)",
      "Shri Sanatan Dharm Govt.Girls Degree College, Rudrapur (Id: C-21901)",
      "S.O.S.G.N. Kaul Institute of Education, Bhimtal (Id: C-21884)",
      "Sriram Institute of Management and Technology, Kashipur (Id: C-21930)",
      "S S J Campus, Almora (Id: C-21902)",
      "Surajmal Agarwal Private Govt.Girls Degree College, Kichha (Id: C-21915)",
      "Utranchal Forest Hospital and Madical College, Haldwani (Id: C-21899)",
      "CENTRE OF INFORMATION & MANAGEMENT KASHIPUR (Id: C-31377)",
      "DAYANAND ACADEMY OF ADVANCED STUDIES DEHRADUN (Id: C-31257)",
      "DAYANAND ACADEMY OF ADVANCED STUDIES,DEHRADUN (Id: C-31474)",
      "DAYANAND ACADEMY OF ADVANCED STUDIES DEHRADUN1 (Id: C-31526)",
      "DAYANAND ACADEMY OF ADVANCE STUDIES, NEW TEHRI (Id: C-31242)",
      "DAYANAND ACADEMY OF ADVANCE STUDIES RISHIKESH (Id: C-31276)",
      "GARHWAL INFOTECH TEHRI GARHWAL (Id: C-31530)",
      "GURUKUL INSTITUTE OF INFORMATION TECHNOLOGY ROORKEE (Id: C-31154)",
      "INFO INSTITUTE OF INFORMATION TECHNOLOGY RISHIKESH (Id: C-31469)",
      "MARG INSTITUTE OF INFORMATION TECHNOLOGY, HALDWANI (Id: C-31275)",
      "ROORKEE INSTITUTE OF MANAGEMENT & SCIENCE ROORKEE (Id: C-31285)",
      "SHARDA INSTITUTE OF MANAGEMENT & TECHNOLOGY HARIDWAR (Id: C-31485)",
      "Remote Sensing National Agency, Department OF Space, Dehradun 248001 (Id: C-41565)",
      "Dr. Balbir Singh Sahitya Kedra (Id: C-22161)",
      "College of Forestry & Hill Agriculture (Id: C-16669)",
      "VCSG College of Horticulture (Id: C-16674)",
      "BALIKA SANSKRIT MAHAVIDYALAYA, SENDUL KEMAR, TEHRI-GARHWAL (Id: C-47618)",
      "BARAHEE DEVI SANSKRIT MAHAVIDYALAYA, DEVIDHURA, CHAMPAWAT (Id: C-47629)",
      "DAIVI SAMPAD ADHYATMA SANSKRIT MAHAVIDYALAYA, PARMARTHA NIKETAN, PO- SWARGASHRAMA, PAURI-GARHWAL (Id: C-47613)",
      "RAJKIYA SANSKRIT MAHAVIDYALAYA, CHAMBA, TEHRI-GARHWAL (Id: C-47617)",
      "SANSKRIT JYOTISH MAHAVIDYALAYA, SATIYANA, PO- THALABAND, CHAMOLI (Id: C-47611)",
      "SHEETAL VEDIC SANSTHAN, RANIPHOKHARI, DEHRADUN (Id: C-47606)",
      "SHRI 108 KALIKAMALIWALE RAMNATHJI CHHATRAHIT KARINEE SANSKRIT PATHASHALA, RISHIKESH (Id: C-47601)",
      "SHRI 108 SWAMI SACHCHIDANANAD SARSWATI SANSKRIT MAHAVIDYALAYA, MANDAL, CHAMOLI (Id: C-47610)",
      "SHRI 108 SWAMI SACHCHIDANAND VEDA BHAWAN SANSKRIT MAHAVIDYALAYA, RUDRAPRAYAG (Id: C-47626)",
      "SHRI BADRINATH RAJKIYA SANSKRIT MAHAVIDYALAYA, NEW TEHRI (Id: C-47619)",
      "SHRI BADRINATH VEDA-VEDANGA SNATKOTAT MAHAVIDYALAYA, JOSHIMATH, CHAMOLI (Id: C-47609)",
      "SHRIBADRISH KEERTI SANSKRIT VIDYALPEETH, DIMMAR SIMALI, CHAMOLI (Id: C-47608)",
      "SHRI BHAGWANDAS ADARSH SANSKRIT MAHAVIDYALAYA, HARIDWAR (Id: C-47596)",
      "SHRI BRAHAMCHARI RAMKRISHANA SANSKRIT MAHAVIDYALAYA, PALIWAL DHARMSHALA, HARIDWAR (Id: C-47595)",
      "SHRI DARSHAN MAHAVIDYALAYA, MUNI-KI-RETI, PO- SHIVANAND NAGAR, RISHIKESH (Id: C-47597)",
      "SHRI DRONASTHALI ARYA KANYA GURUKULA MAHAVIDYALAYA, KISHANPUR, DEHRADUN (Id: C-47600)",
      "SHRI GARIBDASEEYA SADHU SANSKRIT MAHAVIDYALAYA, JAGJEETPUR, HARIDWAR (Id: C-47594)",
      "SHRI GURUKULA MAHAVIDYALAYA, JWALAPUR, HARIDWAR (Id: C-47591)",
      "SHRI GURUMANDALASHRAMA SANSKRIT MAHAVIDYALAYA, HARIDWAR (Id: C-47590)",
      "SHRI GURU RAMRAI LAKSHMAN SANSKRIT MAHAVIDYALAYA, DEHRADUN (Id: C-47599)",
      "SHRI JAGADDEVA SINGH SANSKRIT MAHAVIDYALAYA, SAPTRISHI ASHRAMA, SAPTSAROWAR, HARIDWAR (Id: C-47592)",
      "SHRI JAGADGURU SHRI CHANDRA SANSKRIT MAHAVIDYALAYA, BHAGVADDHAMA, HARIDWAR (Id: C-47593)",
      "SHRI JAIBHARATA SADHU SANSKRIT MAHAVIDYALAYA, NIRANJANI AKHARA, HARIDWAR (Id: C-47586)",
      "SHRI JAIDAYAL SANSKRIT MAHAVIDYALAYA, SHRINAGAR, PAURI-GARHWAL (Id: C-47612)",
      "SHRI JAIRAM SANSKRIT MAHAVIDYALAYA, RISHIKESH (Id: C-47607)",
      "SHRI JWALAMUKHI SANSKRIT MAHAVIDYALAYA, DEVDHUNG VINAYKHAL, TEHRI-GARHWAL (Id: C-47616)",
      "SHRI KEDARNATH ADARSH SANSKRIT MAHAVIDYALAYA, SHORITPUR, LAMGONDI, RUDRAPRAYAG (Id: C-47625)",
      "SHRI KEDARNATH SANATAN DHARMA UPADHI SANSKRIT MAHAVIDYALAYA, UTTARAKHAND VIDYAPEETH, RUDRAPRAYAG (Id: C-47624)",
      "SHRI MAHADEVI GIRI SNATAKOTAR MAHAVIDYALAYA, HALDWANI (Id: C-47620)",
      "SHRI MUNISHWAR VEDANASH SANSKRIT MAHAVIDYALAYA, RISHIKESH (Id: C-47603)",
      "SHRI NARAYAN SANSKRIT MAHAVIDYALAYA, KAMERI DEVI, BAGESHWAR (Id: C-47630)",
      "SHRI NIRMAL SANSKRIT MAHAVIDYALAYA, KANKHAL, HARIDWAR (Id: C-47589)",
      "SHRI PUNJAB SINDH KSHETRA SADHU MAHAVIDYALAYA, RISHIKESH (Id: C-47598)",
      "SHRI RAGHUNATH KEERTI ADARSH SANSKRIT MAHAVIDYALAYA, DEVPRAYAG, PAURI-GARHWAL (Id: C-47614)",
      "SHRI RAMANUJ SHRI VAISHANAV SANSKRIT MAHAVIDAYALAYA, HARIDWAR (Id: C-47587)",
      "SHRI RISHIKULA VIDYAPEETH BRAHMCHARYA SANSKRIT MAHAVIDYALAYA, HARIDWAR (Id: C-47585)",
      "SHRI RISHI SANSKRIT MAHAVIDYALAYA, NIRDHAN NIKETAN, KHARKHARI, HARIDWAR (Id: C-47584)",
      "SHRI SANATAM DHARMA SANSKRIT MAHAVIDYALAYA, MAYKOTI, RUDRAPRAYAG (Id: C-47628)",
      "SHRI SANATAN DHRAMA SANSKRIT MAHAVIDYALAYA, RAILWAY BAZAR, HALDWANI (Id: C-47621)",
      "SHRI SANATAN DHRAM SANSKRIT MAHAVIDYALAYA, LANDHAUR, MASOORI, DEHARADUN (Id: C-47602)",
      "SHRI SANATAN SATSANG SANSKRIT MAHAVIDYALAYA, KASHIPUR (Id: C-47622)",
      "SHRI SARSWATI SANSKRIT MAHAVIDYALAYA, VASUKEDAR, RUDRAPRAYAG (Id: C-47627)",
      "SHRI SHIVANAND SANSKRIT MAHAVIDYALAYA, 62, PREETAM PATH DALANWALA, DEHRADUN (Id: C-47604)",
      "SHRI UDASEEN SANSKRIT MAHAVIDYALAYA, PANCHAYATI AKHARA, HARIDWAR (Id: C-47588)",
      "SHRI VISHWANATHA SNATAKOTAR SANSKRIT MAHAVIDYALAYA, UJELI, UTTARAKASHI (Id: C-47623)",
      "UTTARANCHAL AYURVEDIC COLLEGE, RAJPUR ROAD, DEHRADUN (Id: C-47605)",
      "VEDIC ASHRAM GURUKULA MAHAVIDYALAYA, KANVASHRAMA, KOTDWAR (Id: C-47615)",
      "Academy of Management Studies (Id: C-21307)",
      "Amrapali Institute of Hotel Management (Id: C-21328)",
      "Amrapali Institute of Management & Computer Applications (Id: C-21304)",
      "Amrapali Institute of Technology & Sciences (Id: C-21255)",
      "Balwant Singh Mukhiya (BSM) College of Engineering (Id: C-21320)",
      "Beehive College of Engg. & Technology (Id: C-21277)",
      "Beehive College of Management & Technology (Id: C-21316)",
      "B.F.I.T. Technical Campus (Id: C-21293)",
      "Bipin Chandra Tripathi Kumaon Engineering College (Id: C-21283)",
      "Birla Institute of Applied Sciences (Id: C-21313)",
      "Bishambhar Sahaya Management Institute (Id: C-21331)",
      "Bishambhar Sahay Institute of Technology (Id: C-21308)",
      "BLUE MOUNTAINS COLLEGE OF TEACHER EDUCATION (Id: C-47450)",
      "B.R.D. College of Management & Sciences (Id: C-21267)",
      "COER School of Management (Id: C-21261)",
      "College of Engineering Roorkee (Id: C-21275)",
      "Daas College of Management & Technology (Id: C-21258)",
      "Dehradun Institute of Technology (Id: C-21311)",
      "Dev Bhoomi Institute of Pharmacy & Research (Id: C-21254)",
      "Dev Bhoomi Institute of Technology (Id: C-21289)",
      "Dev Bhoomi Institute of Technology and Engineering (Id: C-21260)",
      "Devsthali Vidhyapeeth College of Management Studies (Id: C-21268)",
      "Devsthali Vidhyapeeth College of Pharmacy (Id: C-21269)",
      "Doon Business School (Id: C-21266)",
      "Doon College of Engg. & Technology (Id: C-21329)",
      "Doon Institute of Engineering & Technology (Id: C-21314)",
      "Doon Institute of Management & Technology (Id: C-21281)",
      "Dronas College of Management & Technical Education (Id: C-21276)",
      "G.B. Pant Engineering College (Id: C-21323)",
      "Global Institute of Pharmaceutical Education & Research (Id: C-21327)",
      "Govt. Institute of Hotel Management-Almora (Id: C-21257)",
      "Govt. Institute of Hotel Management-Dehradun (Id: C-21291)",
      "G.R.D. Institute of Management & Technology (Id: C-21309)",
      "GRD (PG) IMT (Id: C-21274)",
      "Gyani Indra Singh Institute of Professional Studies (Id: C-21302)",
      "Hermes College of Engg. & Management (Id: C-21280)",
      "Himalayan Institute of Pharmacy & Research (Id: C-21294)",
      "Institute of Co-Operative Management (Id: C-21324)",
      "Institute of Management Studies (Id: C-21297)",
      "Institute of Management Studies-Dehradun (Id: C-21287)",
      "Institute of Management & Technology (Id: C-21285)",
      "Institute of Technology Roorkee (ITR) (Id: C-21271)",
      "J.B. Institute of Technology (Id: C-21312)",
      "Kukreja Institute of Hotel Management & Catering Technology (Id: C-21286)",
      "Mahadevi Institute of Technology (Id: C-21303)",
      "Maya Institute of Technology & Management (Id: C-21270)",
      "M.I.E.T. Kumaon (Id: C-21279)",
      "Modern Institute of Technology (Id: C-21306)",
      "Nimbus Academy of Management (Id: C-21263)",
      "Om Bio-Sciences & Management College (Id: C-21296)",
      "Om Bio-Sciences & Pharma College (Id: C-21325)",
      "Omkarananda Institute of Management & Technology (Id: C-21256)",
      "Phonics School of Engg. & Business Administration (Id: C-21288)",
      "Quantum School of Business (Id: C-21317)",
      "Quantum School of Technology (Id: C-21265)",
      "Ramanand Institute of Pharmacy & Management (Id: C-21322)",
      "Ram Institute of Hotel Management & Catering (Id: C-21310)",
      "RIMS (Id: C-21290)",
      "Roorkee College of Engineering (Id: C-21318)",
      "Roorkee College of Management & Computer Applications (Id: C-21305)",
      "Roorkee College of Pharmacy (Id: C-21272)",
      "Roorkee Institute of Technlogy (Id: C-21298)",
      "Saraswati Institute of Management & Technology (Id: C-21278)",
      "Sardar Bhagwan Singh (PG) Institute of Bio-Medical Sciences & Research (Id: C-21330)",
      "SEEMANT INSTITUTE OF TECHNOLOGY (Constituent College of Uttarakhand technical University) (Id: C-21319)",
      "Selaqui Institute of Engineering & Technlogy (Id: C-21259)",
      "S.G.R.R. Academy of Pharmaceutical Sciences (Id: C-21251)",
      "S.G.R.R. Institute of Management (Id: C-21326)",
      "S.G.R.R. Institute of Technology & Science (Id: C-21273)",
      "Shivalik College of Engg. (Id: C-21299)",
      "Shree Dev bhoomi Institute of Education Science & Technology (Id: C-21315)",
      "Siddhartha Institute of Pharmacy (Id: C-21262)",
      "Smt. Tarawati Institute of Bio-Medical & Applied Sciences (Id: C-21292)",
      "Sri Ram Institute of Management & Technology (PG College) (Id: C-21300)",
      "Surajmal Agarwal Girls College of Management (Id: C-21253)",
      "Surajmal Laxmi Devi Sawarthia Educational Trust (Id: C-21252)",
      "Swami Darshananand Institute of Management & Technology (Id: C-21301)",
      "THDC Institute of Hydropower Engineering & Technology (Constituent College of Uttarakhand technical University) (Id: C-21295)",
      "Tulas Institute (Id: C-21282)",
      "UPES Institute of Management (Id: C-21284)",
      "Uttaranchal Institute of Technology (Id: C-21264)",
      "Wali Gramoudhyoga Vikas Sansthan TECHWORDS Group of Institutions (Id: C-21321)",
      "WOMEN INSTITUTE OF TECHNOLOGY (Id: C-47540)"
    ],
   

  },
  {
    state: "West Bengal",
    district: ["Alipurduar","Bankura","Birbhum","Cooch Behar","Dakshin Dinajpur","Darjeeling","Hooghly","Howrah","Jalpaiguri","Jhargram","Kalimpong","Kolkata","Malda","Murshidabad","Nadia","North 24 Parganas","Paschim Bardhaman","Paschim Medinipur","Purba Bardhaman","Purba Medinipur","Purulia","South 24 Parganas","Uttar Dinajpur"],
    college:[]

  },
  {
    state: "Delhi",
    district: ["Central Delhi","East Delhi","New Delhi","North Delhi","North East Delhi","North West Delhi","Shahdara","South Delhi","South East Delhi","South West Delhi","West Delhi"],
    college:[]

  },
  
];
const CARegisterPage = () => {
  const {userData, setUserData} = useContext(UserContext);
  const { setIsLogin } = useContext(LoggedContext);
  const [isregister, setIsregister] = useState(false);
  const handleChange = (e, name) => {
    setUserData({ ...userData, [name]: e.target.value });
  };
  const [caDetail, setCaDetails] = useState({});

  const submitForm = async (e) => {
    e.preventDefault();
    try {

      const response = await VKYRequest('post', '/auth/signup',{...userData, role: 'CA'});

      setCookie('jwt', response.data.token, import.meta.env.VITE_JWT_EXPIRES_IN);
      setIsLogin(true);
      setIsregister(true);

      setCaDetails(response.data.userCreated);

    } catch (error) {
      console.log(error);
    }
  };

  return (

   
    <div className="bg-EventBG ">
      {!isregister && (
        <div className="h-fit flex justify-center pt-8">
          {" "}
          <div className="sm:w-6/12 my-24 sm:mr-20 mx-2 rounded-3xl bg-cover bg-center bg-no-repeat text-white bg-LoginBG">
            <h1 className="font-cuda text-2xl sm:text-4xl flex justify-center py-8">
              Registration
            </h1>
            <div className="sm:px-16 px-10">
              <form action="">
                <div className="flex flex-col sm:flex-row justify-between gap-6 pb-6">
                  <div className="flex flex-col w-full sm:w-5/12">
                    <label className="font-cR mb-2 font-light text-sm">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="YourName"
                      defaultValue={userData?.name}
                      disabled
                      className="bg-[#5f43b2] px-3 py-2 rounded-lg text-sm w-full"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-5/12">
                    <label className="font-cR mb-2 font-light text-sm">
                      Your Email
                    </label>
                    <input
                      type="text"
                      placeholder="E-Mail ID"
                      defaultValue={userData?.email}
                      disabled
                      className="bg-[#5f43b2] px-3 py-2 rounded-lg text-sm w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-6 pb-6">
                  <div className="flex flex-col sm:w-5/12">
                    <label className="font-cR mb-2 text-sm">
                      Your Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="+91"
                      onChange={(e) => handleChange(e, "pNum")}
                      className="bg-[#5f43b2] px-3 py-2 rounded-lg text-sm w-full"
                    />
                  </div>
                  <div className="flex flex-col sm:w-5/12">
                    <label className="font-cR mb-2 font-light text-sm">
                      College State
                    </label>
                    <select 
                 className="bg-[#5f43b2] px-3 py-2 rounded-lg text-sm w-full"
                 onChange={(e) => handleChange(e, "state")}
                 >
                       <option value="">Select State</option>
                  {indianStates.map((state, index) => (
                    <option key={index} value={state.state}>
                      {state.state}
                    </option>
                  ))}
                      </select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-6 pb-6">
                  <div className="flex flex-col sm:w-5/12">
                    <label className="font-cR mb-2 font-light text-sm">
                      College City{" "}
                    </label>
                    <select
                  className="bg-[#5f43b2] px-3 py-2 rounded-lg text-sm w-full"
                  onChange={(e) => handleChange(e, "city")}
                >
                  <option value="">Select City</option>
                  {formData.state &&
                    indianStates
                      .find((state) => state.state === formData.state)
                      ?.district.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                </select>
                  </div>
                  <div className="flex flex-col sm:w-5/12">
                    <label className="font-cR mb-2 font-light text-sm">
                      College Name
                    </label>
                    <select
                  className="bg-[#5f43b2] px-3 py-2 rounded-lg text-sm w-full"
                  onChange={(e) => handleChange(e, "college")}
                >
                  <option value="">Select College</option>
                  {formData.state &&
                    indianStates
                      .find((state) => state.state === formData.state)
                      ?.college.map((college, index) => (
                        <option key={index} value={college}>
                          {college}
                        </option>
                      ))}
                </select>
                  </div>
                </div>
                <div className="flex justify-center my-4 pb-2">
                  <button className="btn" type="submit" onClick={submitForm}>
                    <span className="px-16">Submit</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
          <div className="hidden sm:flex flex-col justify-end w-5/12">
            <img src={aerocraft} alt="Astronaut" className="w-9/12" />
          </div>
        </div>
      )}
      {isregister && (
        <div className="h-screen flex justify-center items-center bg-bg_planet sm:bg-none">
          <div className="hidden sm:flex sm:my-10 w-1/3justify-end items-end ">
            <img src={desktop_bg_image} className="mt-64" />
          </div>
          <div className="h-96 w-96 sm:w-2/3 mx-5 border-1 border-[#5F43B2] my-10  sm:my-5 bg-purple-900 rounded-[42px] bg-clip-padding backdrop-filter bg-opacity-[0.4] touch-none md:px-16 md:py-20 px-12 py-14 text-center text-white flex justify-between flex-col">
            <h1 className="text-2xl font-cuda ">Registration Successful</h1>
            <div className="sm:flex text-center justify-center">
              <p className=" text-2xl ">WELCOME ONBOARD</p>
              <p>
                <span className=""> {caDetail?.name} </span>
              </p>
            </div>
            <div className="sm:flex text-center justify-center">
              <p className="">GOONJ CA ID</p>
              <p className=""> {caDetail?.generated_id} </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CARegisterPage;
