(function(){
  /* Endpoint do Formspree da lista de espera. Vazio = formulário avisa que a lista ainda não abriu (nunca finge sucesso). */
  var FORM_ENDPOINT = 'https://formspree.io/f/xbgldopb';

  var form = document.getElementById('lista');
  var input = document.getElementById('eloa-email');
  var btn = document.getElementById('eloa-submit');
  var status = document.getElementById('eloa-status');
  var icons = {
    ok:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4,12 L10,18 L20,6"/></svg>',
    info:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16.5"/><circle cx="12" cy="7.8" r=".6" fill="currentColor"/></svg>'
  };

  function show(kind, html){
    status.className = 'form-status' + (kind === 'success' ? ' is-success' : kind === 'error' ? ' is-error' : '');
    status.innerHTML = (kind === 'success' ? icons.ok : icons.info) + '<div>' + html + '</div>';
    status.hidden = false;
  }
  function busy(on){
    btn.disabled = on;
    btn.textContent = on ? 'Enviando…' : 'Entrar na lista';
    form.setAttribute('aria-busy', on ? 'true' : 'false');
  }

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    var email = input.value.trim();
    if (!email || !input.checkValidity()){
      show('error', 'Confira o e-mail: ele precisa ter o formato <strong>nome@exemplo.com</strong>.');
      input.setAttribute('aria-invalid','true');
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');

    if (!FORM_ENDPOINT){
      show('info', 'A lista abre nos próximos dias e seu e-mail ainda não foi registrado. Enquanto isso, siga <a href="https://instagram.com/eloa.app" target="_blank" rel="noopener">@eloa.app</a> para ser avisada.');
      return;
    }

    busy(true);
    var data = new FormData(form);
    fetch(FORM_ENDPOINT, { method:'POST', body:data, headers:{ 'Accept':'application/json' } })
      .then(function(res){
        if (!res.ok) throw new Error('status ' + res.status);
        form.hidden = true;
        show('success', '<strong>Prontinho, seu e-mail está na lista.</strong> Avisamos assim que o Eloá abrir.');
      })
      .catch(function(){
        show('error', 'Não conseguimos registrar seu e-mail agora. Tente de novo em instantes ou siga <a href="https://instagram.com/eloa.app" target="_blank" rel="noopener">@eloa.app</a>.');
      })
      .finally(function(){ busy(false); });
  });
})();
