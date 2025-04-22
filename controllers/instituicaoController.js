async function criarInstituicao(req, res) {
  const { nome } = req.body;

  try {
    const [resultado] = await pool.query(
      'INSERT INTO instituicoes (nome) VALUES (?)',
      [nome]
    );

    res.status(201).json({ message: `Instituição ${nome} criada com sucesso` });
  } catch (erro) {
    console.error('Erro ao criar instituição:', erro);
    res.status(500).json({ error: 'Erro ao criar instituição' });
  }
}
