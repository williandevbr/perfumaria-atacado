# Política de Segurança

## Reportar uma vulnerabilidade

Encontrou algo? **Não abra issue pública.** Use o botão "Report a vulnerability" na aba **Security** do repositório (relato privado) ou fale direto com o mantenedor.

## Proteções ativas neste repositório

- **Push protection**: o GitHub barra na hora qualquer commit com chave/senha.
- **Secret scanning**: varredura automática de segredos no código.
- **Dependabot**: atualizações semanais de dependências + alertas de segurança.
- **Branch `master` travada**: sem push direto, sem push forçado e sem apagar (vale até para o dono).
- **Toda mudança via PR**: exige 1 aprovação, review do dono (`CODEOWNERS`), conversas resolvidas e CI (`build`) verde.
- **Push restrito**: só `williandevbr` pode enviar/mergir. Sem colaboradores externos.
- **Fork**: o GitHub não permite desabilitar fork em repo pessoal público; a proteção é jurídica (`LICENSE` proprietária) + técnica (só o dono tem escrita, nada entra sem PR aprovado por ele).
- **Acesso**: só o dono tem escrita. Nada entra sem aprovação dele.
