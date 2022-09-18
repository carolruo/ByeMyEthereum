// https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment
const main = async () => {
    //O Hardhat Runtime Environment, ou HRE abreviado, é um objeto que contém todas as funcionalidades que a Hardhat expõe ao executar uma tarefa, teste ou script
    //Compila o contrato e gera arquivos necessários para trabalhar com o contrato no diretório artifacts:
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const [owner, randomPerson] = await hre.ethers.getSigners();
    //Implantar o contrato na blockchain, destroi a rede quando concluído
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    //Para encontrar o contrato na blockchain real é através desse address
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    await waveContract.getTotalWaves();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();