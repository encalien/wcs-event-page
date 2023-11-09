<script lang="ts">
import messages from '../../i18n/en';

export default {
  data() {
    return {
      messages: messages
    }
  },
  // watch:{
  //   $route() {
  //     if (this.$store.state.lang !== "si") {
  //       this.$router.redirect(`/${lang}`)
  //     }
  //   }
  // },
}
</script>

<template>
  <section>
    <h1>Pogosta vprašanja o WSDC in točkah</h1>
    <div v-if="$store.state.lang === 'si'">
      <div class="faq-item">
        <h2>1. Kaj so to WSDC točke?</h2>
        <p><a href="https://www.worldsdc.com" target="_blank">WSDC (World Swing Dance Council)</a> je svetovna organizacija, ki med drugim podeljuje mednarodnim swing dogodkom licenco za točkovana tekmovanja. Na teh tekmovanjih udeleženci s svojo uvrstitvijo na določeno mesto lahko osvojijo določeno število točk.</p>
        <p>Ko tekmovalec pridobi točke, ga WSDC vpiše v <a href="https://www.worldsdc.com/registry-points/" target="_blank">svoj sistem</a> in mu dodeli unikatno številko (WSDC ID). Na podlagi te številke se vodi evidenca točk posameznega tekmovalca.</p>
        <p>WSDC licencirana tekmovanja so razdeljena v več stilov in kategorij. Za nas je pomemben stil Jack & Jill, ki je edini, kjer se točke pridobivajo. Ta stil tekmovanja je po zahtevnosti razdeljen na kategorije:
          <ul>
            <li><span class="important">Newcomer (NEW)</span> - najnižji nivo, neobvezen, namenjen novim plesalcem;</li>
            <li><span class="important">Novice (NOV)</span> - najnižji obvezen nivo, namenjen plesalcem, ki že imajo nekaj znanja, lahko pa se mu pridružijo tudi plesalci začetniki. Za vstop v ta nivo točke niso potrebne;</li>
            <li><span class="important">Intermediate (INT)</span> - srednji nivo, namenjen naprednejšim plesalcem, ki so že večkrat tekmovali in v skupnem seštevku nabrali vsaj 16 Novice točk;</li>
            <li><span class="important">Advanced (ADV)</span> - visok nivo, namenjen izkušenim plesalcem, ki so v skupnem seštevku zbrali vsaj 30 Intermediate točk;</li>
            <li><span class="important">All Star (ALS)</span> - izjemno visok nivo, namenjem plesalcem, ki so v skupnem seštevku zbrali že vsaj 60 Advanced točk;</li>
            <li><span class="important">Champions (CHA)</span> - najvišji nivo, namenjem tistim, ki so v svetovnem vrhu in so v skupnem seštevku zbrali že vsaj 150 All Star točk;</li>
          </ul>
        </p>
        <p>Vsak posameznik tako napreduje iz ene kategorije v drugo glede na to koliko točk je zbral v skupnem seštevku. Za lepši prikaz si oglej <a href="https://www.worldsdc.com/wsdc-points-registry-rules/#figure-tbl03" target="_blank">diagram</a> v uradnem pravilniku.</p>
      </div>
      <div class="faq-item">
        <h2>2. Kaj je to WSDC trial event?</h2>
        <p>WSDC trial event, je vsaj 3-dnevni mednarodni dogodek z delavnicami, žuri in tekmovanji, ki ustreza zahtevam pravilnika WSDC in se poteguje za njihovo licenco.</p>
        <p>WSDC mora tak dogodek vnaprej odobriti kot poskusni (trial run). V tem letu mora dogodek zadostiti vsem potrebam, ne podeljuje pa še točk. Če trial run uspe, potem WSDC za prihodnja leta temu dogodku podeli licenco. Od takrat naprej so tekmovanja točkovana.</p>
      </div>
      <div class="faq-item">
        <h2>3. Kam naj se torej prijavim?</h2>
        <p>Če še nimaš WSDC ID številke in nisi še nikdar tekmoval_a, ali pa tekmuješ v kategorijah Newcomer, Novice ali Intermediate, se lahko prijaviš na delavnice v sklopu Full Pass. Te delavnice bodo potekale v soboto in nedeljo, razdeljene pa bodo na 3 nivoje:
          <ul>
            <li>Level 2 ustreza stopnji Newcomer,</li>
            <li>Level 3 ustreza stopnji Novice z vsaj 1 točko,</li>
            <li>Level 4 ustreza stopnji Intermediate.</li>
          </ul>
        </p>
        <p>Če si popolen začetnik, ali pa si se z WCS le bežno spoznal_a in se želiš naučiti osnov, potem se lahko pridružiš našemu petkovemu programu Zero to Hero. V 4 urah boš spoznal_a osnove tako, da boš na petkovi zabavi gotovo lahko plesal_a.</p>
        <p>Na ADV+ Full Pass, ki ima delavnice prav tako samo v petek, se lahko prijaviš samo, če tekmuješ v kategorijah Advanced / All Star / Champion.</p>
      </div>
      <div class="faq-item">
        <h2>4. Kaj napišem v polje WSDC ID ob prijavi?</h2>
        <p>Če že imaš številko WSDC ID, ki si jo pridobil na tekmovanju, potem jo vpiši. Na podlagi te številke bomo avtomatsko določili nivo ob prijavi.</p>
        <p>Če številke še nimaš, pusti prazno.</p>
      </div>
      <div class="faq-item">
        <h2>5. OK, kaj pa, če se ne udeležujem tekmovanj?</h2>
        <p>Nič hudega. Ob prijavi željenega nivoja ni potrebno definirati. To bomo določili ob prihodu avtomatsko glede na WSDC točkovni sistem.</p>
        <p>Če želiš sodelovati na delavnicah višjega nivoja, se lahko udeležiš avdicije, ki bo potekala pred delavnicami. Tam bodo učitelji prosili udeležence, da večkrat odplešejo z različnimi partnerji, in se na podlagi videnega znanja odločili, koga lahko sprejmejo na višji nivo. Odločitev učiteljev je dokončna, saj oni najbolje vejo, katero znanje pričakujejo za svoje delavnice.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
  h2 {
    text-align: left;
  }

  .important {
    color: var(--black);
  }

  .faq-item {
    margin: 3rem 0;
  }
</style>
