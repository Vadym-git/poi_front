import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Map from "../components/map";

export default function SinglePoi() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: "100vh", // висота на весь екран
        overflow: "hidden", // важливо, щоб не вийти за межі
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
          height: "100%",
          overflowY: "auto", // прокрутка якщо багато контенту
          padding: 1, // трохи паддінгу щоб красиво виглядало
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        <h6 style={{ margin: "50px 0 0 0" }}>Author Name</h6>
        <h1 style={{ margin: "0", fontSize: "70px" }}>Vietnam</h1>
        <h6 style={{ margin: "0 0 50px 0" }}>Top Choice if it Is</h6>
        <img
          src="https://career-advice.jobs.ac.uk/wp-content/uploads/An-image-of-Vietnam.jpg.optimal.jpg"
          width="100%"
        />
        <p style={{ margin: "0" }}>image description</p>
        <h2>Article name here</h2>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique
          labore, nesciunt soluta quaerat laboriosam, tenetur ipsum provident
          debitis dolor cumque facilis dignissimos impedit cupiditate magnam
          mollitia facere id, nihil dolorum a inventore beatae accusamus alias
          minus suscipit. Quo illo commodi, voluptatum perferendis porro
          suscipit, ut totam dolores molestiae explicabo rem libero debitis cum
          dignissimos impedit sapiente minima eos in quas deserunt! Quia nihil,
          dignissimos aliquam eum necessitatibus sit velit voluptatibus incidunt
          aspernatur. Odio dicta dolore ad voluptate odit similique ratione
          necessitatibus recusandae quos vero, facere ullam minus tenetur ut
          eveniet nam nihil omnis molestiae iusto fuga, delectus ipsam quaerat
          est sed. Provident dolore, quas sit itaque aliquam magnam totam rem
          reiciendis magni facilis laboriosam in atque ipsam culpa ad placeat
          asperiores eius et id odio ea ipsa! Magnam non odio fuga error qui
          optio natus sunt minima maxime fugiat architecto numquam, nihil
          inventore quas, dolores quasi harum consectetur. Esse tempore porro,
          hic ea quod voluptatibus obcaecati maiores, nihil sit ab autem nemo
          non numquam soluta neque. Illum consequatur necessitatibus et! Nihil
          odio odit aut, harum alias, quidem mollitia similique ut nisi quia
          voluptatibus earum quibusdam atque expedita accusamus rerum ipsa fugit
          quos animi voluptates fuga. Perferendis et accusantium asperiores
          consectetur veritatis aliquid doloribus beatae quasi quas iste
          perspiciatis quam mollitia omnis fugiat, id earum voluptate sequi in
          rem natus quidem recusandae itaque culpa. Recusandae deleniti nisi
          dicta et, sunt, doloremque amet aliquid possimus debitis magnam
          placeat eaque sapiente officia incidunt unde? Dolor rem vel tempora
          voluptatum, quos perferendis nobis nam earum? Possimus debitis iusto
          dolore aut pariatur quae quam consequuntur! Assumenda modi rem
          tempora, quod deleniti similique, laboriosam illum debitis soluta,
          dicta ducimus harum hic? Labore, quos voluptatum? Exercitationem,
          corrupti. Saepe suscipit nobis odit, debitis esse nam iusto, voluptate
          provident, libero ullam expedita ut consequatur temporibus omnis.
          Distinctio officia cum ut odio neque molestiae saepe quis deleniti
          vero quo eaque praesentium quas modi, possimus maxime soluta
          consectetur eos numquam atque dolorem voluptates consequatur,
          provident at. Odit veniam voluptatibus officia nisi atque reiciendis
          unde voluptas tenetur nulla sint vel recusandae cumque quas facere
          consequatur incidunt sapiente iusto iure tempore, autem natus itaque.
          Officia aspernatur rem minus doloremque qui a id deleniti! Rem, modi
          deleniti consequuntur adipisci natus ut! Porro nulla reiciendis nihil
          quia, doloremque itaque amet quam, quaerat illo laudantium iure
          laboriosam repellat suscipit accusamus omnis officia iste tempora
          obcaecati sint, quasi molestias perferendis maxime? Voluptatibus
          officiis impedit voluptatem molestias harum obcaecati, aliquam
          veritatis magnam aut rem excepturi quam alias cum tempore eius nisi
          libero, illum hic? Doloribus necessitatibus commodi error iusto eaque
          ad culpa nam non quaerat excepturi cumque explicabo, atque mollitia!
          Autem repudiandae illum, accusantium veniam qui at. Veniam nobis eum
          facere sapiente eligendi. Asperiores omnis sed quaerat perferendis cum
          expedita possimus, ab nisi distinctio cupiditate nulla alias
          necessitatibus quas veniam obcaecati impedit aspernatur, perspiciatis
          nam earum placeat non quasi, reprehenderit illum laudantium! Animi
          totam ut quae iste itaque praesentium culpa, alias placeat eius enim
          eos, magnam nihil veritatis libero magni? Mollitia, enim deleniti?
          Error voluptatum ratione nostrum possimus.
        </div>
      </Box>
      <Box
        sx={{
          width: "20%",
          height: "100%", // щоб і цей бокс займав всю висоту
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            margin: "0 10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PlaceOutlinedIcon fontSize="medium" />
            <div><b>ADDRESS</b></div>
          </Box>
          <div style={{ margin: "0 0 0 24px" }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
            earum placeat nihil accusamus porro provident ipsam debitis
            laudantium quo fuga.
          </div>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            margin: "0 10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PlaceOutlinedIcon fontSize="medium" />
            <div><b>OPENING HOURS</b></div>
          </Box>
          <div style={{ margin: "0 0 0 24px" }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit
          </div>
        </Box>
        <Map/>
      </Box>
    </Box>
  );
}
