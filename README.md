
<img width="1919" height="1079" alt="KRS CITYHALL" src="https://github.com/user-attachments/assets/75c71de9-13e7-4037-afe4-f8af77fb3045" />


**KRS CITYHALL** is a simple **job center system** for FiveM servers. It is built with **React** and **Mantine UI** to provide a clean and easy-to-use interface where players can choose jobs and manage their documents quickly.

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Mantine](https://img.shields.io/badge/Mantine-339AF0?style=flat&logo=mantine&logoColor=white)

---

### ✨ Features

* Clean and simple UI
* Job selection with descriptions and images
* Search bar to find jobs
* Request ID Card and Driver License
* NPC interaction via:

  * `ox_target`
  * `textui`
* Configurable (jobs, locations, licenses)
* Basic protections against abuse

---

### 🛠️ Requirements

* [ox_lib](https://github.com/overextended/ox_lib)
* [qbx_core](https://github.com/Qbox-project/qbx_core)
* [ox_inventory](https://github.com/overextended/ox_inventory)
* [ox_target](https://github.com/overextended/ox_target)

---

### 🚀 Installation

#### 1. Download the resource

Place the `krs_cityhall` folder into your server's `resources` directory.

#### 2. UI Configuration (For Developers)

If you want to modify the UI, go into the `web` folder and run:

* **Install dependencies**:

```bash id="x9z0c2"
npm i
```

* **Run in development**:

```bash id="8lj3ps"
npm run dev
```

* **Build production**:

```bash id="0p1k9s"
npm run build
```

#### 3. Server configuration

Add this to your `server.cfg`:

```cfg id="1qaz2w"
ensure krs_cityhall
```

---

### 🎮 Usage

* Go to City Hall
* Interact with the NPC
* Choose a job
* Request documents if needed

---

## 🤝 Support

* **Discord**: [https://discord.gg/CqfzJXvKvk](https://discord.gg/BshrDcuY4e)
* **Author**: Krs Scripts

---

*Developed with ❤️ by Krs Scripts*
